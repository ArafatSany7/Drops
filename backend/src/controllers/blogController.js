const prisma = require('../lib/prisma');

/**
 * Get all blog posts (public) - with pagination, search, category filter
 */
const getAllPosts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 9,
      search = '',
      category
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } }
      ];
    }
    if (category) where.category = category;

    const [posts, totalCount] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true
            }
          }
        },
        skip,
        take,
        orderBy: { publishedAt: 'desc' }
      }),
      prisma.blogPost.count({ where })
    ]);

    // Get distinct categories
    const categories = await prisma.blogPost.findMany({
      select: { category: true },
      distinct: ['category']
    });

    res.json({
      success: true,
      data: posts,
      categories: categories.map(c => c.category),
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / take),
        totalCount,
        limit: take
      }
    });
  } catch (error) {
    console.error('Get All Posts Error:', error);
    res.status(500).json({ message: 'Server Error while fetching blog posts' });
  }
};

/**
 * Get single blog post by slug (public)
 */
const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Get related posts (same category, exclude current)
    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        category: post.category,
        id: { not: post.id }
      },
      include: {
        author: { select: { firstName: true, lastName: true } }
      },
      take: 3,
      orderBy: { publishedAt: 'desc' }
    });

    res.json({
      success: true,
      data: post,
      relatedPosts
    });
  } catch (error) {
    console.error('Get Post By Slug Error:', error);
    res.status(500).json({ message: 'Server Error while fetching blog post' });
  }
};

/**
 * Create blog post (Admin only)
 */
const createPost = async (req, res) => {
  try {
    const { title, excerpt, content, coverImage, category, tags } = req.body;

    if (!title || !excerpt || !content || !coverImage || !category) {
      return res.status(400).json({ message: 'Please provide title, excerpt, content, coverImage, and category' });
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      + '-' + Date.now().toString(36);

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        category,
        tags: tags || [],
        authorId: req.user.id
      },
      include: {
        author: { select: { firstName: true, lastName: true } }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: post
    });
  } catch (error) {
    console.error('Create Post Error:', error);
    res.status(500).json({ message: 'Server Error while creating blog post' });
  }
};

/**
 * Update blog post (Admin only)
 */
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, coverImage, category, tags } = req.body;

    const updateData = {};
    if (title) {
      updateData.title = title;
      updateData.slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        + '-' + Date.now().toString(36);
    }
    if (excerpt) updateData.excerpt = excerpt;
    if (content) updateData.content = content;
    if (coverImage) updateData.coverImage = coverImage;
    if (category) updateData.category = category;
    if (tags) updateData.tags = tags;

    const post = await prisma.blogPost.update({
      where: { id },
      data: updateData,
      include: {
        author: { select: { firstName: true, lastName: true } }
      }
    });

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: post
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    console.error('Update Post Error:', error);
    res.status(500).json({ message: 'Server Error while updating blog post' });
  }
};

/**
 * Delete blog post (Admin only)
 */
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.blogPost.delete({ where: { id } });

    res.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    console.error('Delete Post Error:', error);
    res.status(500).json({ message: 'Server Error while deleting blog post' });
  }
};

module.exports = {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
};
