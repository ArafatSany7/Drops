import { Search, MapPin, ArrowUpDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import api from '../api/axios'
import DonorCard from '../components/DonorCard'
import SkeletonCard from '../components/SkeletonCard'
import Pagination from '../components/Pagination'

export default function FindBlood() {
  const [donors, setDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [bloodGroup, setBloodGroup] = useState('All groups');
  const [district, setDistrict] = useState('');
  const [gender, setGender] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchDonors = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', '9');
      if (search.trim()) params.append('search', search.trim());
      if (bloodGroup !== 'All groups') params.append('bloodGroup', bloodGroup);
      if (district.trim()) params.append('district', district.trim());
      if (gender !== 'All') params.append('gender', gender);
      params.append('sortBy', sortBy);
      params.append('sortOrder', sortOrder);

      const response = await api.get(`/donors?${params.toString()}`);
      setDonors(response.data.data || []);
      setTotalPages(response.data.pagination?.totalPages || 1);
      setCurrentPage(response.data.pagination?.currentPage || 1);
      setTotalCount(response.data.pagination?.totalCount || 0);
    } catch (error) {
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors(1);
  }, [bloodGroup, district, gender, sortBy, sortOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDonors(1);
  };

  return (
    <div className="flex-1 bg-bg-subtle flex flex-col items-center">
      <Helmet>
        <title>Find Blood | Drops</title>
      </Helmet>
      
      {/* Header Section */}
      <section className="w-full bg-gray-900 text-white py-16 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center" data-aos="fade-down">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Find a Blood Donor</h1>
          <p className="text-text-muted text-lg max-w-2xl">
            Search our extensive network of verified donors. Filter by location, blood type, and gender to find an exact match quickly.
          </p>
        </div>
      </section>

      {/* Search and Filter Box */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20" data-aos="fade-up" data-aos-delay="100">
        <div className="bg-bg-surface p-6 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-border-subtle">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Search Name */}
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold text-text-muted mb-2">Search Name</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input 
                  type="text" 
                  placeholder="e.g. Rahim Uddin"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-bg-subtle border border-border-strong rounded-xl pl-10 pr-4 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-xs font-bold text-text-muted mb-2">Blood Group</label>
              <select 
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
              >
                <option>All groups</option>
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-xs font-bold text-text-muted mb-2">District</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input 
                  type="text" 
                  placeholder="e.g. Dhaka"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-bg-subtle border border-border-strong rounded-xl pl-10 pr-4 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-end">
              <button 
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover transition shadow-md shadow-primary/20"
              >
                Search
              </button>
            </div>
          </form>

          {/* Secondary Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 pt-6 border-t border-border-subtle gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-muted">Gender:</span>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="bg-bg-subtle border border-border-strong rounded-lg px-3 py-1.5 text-sm text-text-base focus:outline-none focus:ring-1 focus:ring-primary">
                  <option value="All">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-muted flex items-center gap-1"><ArrowUpDown className="w-3 h-3"/> Sort:</span>
                <select value={`${sortBy}-${sortOrder}`} onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split('-');
                  setSortBy(newSortBy);
                  setSortOrder(newSortOrder);
                }} className="bg-bg-subtle border border-border-strong rounded-lg px-3 py-1.5 text-sm text-text-base focus:outline-none focus:ring-1 focus:ring-primary">
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                  <option value="firstName-asc">Name (A-Z)</option>
                  <option value="firstName-desc">Name (Z-A)</option>
                </select>
              </div>
            </div>
            
            <p className="text-sm text-text-muted font-medium">
              Found <strong className="text-text-base">{totalCount}</strong> matching donors
            </p>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : donors.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donors.map((donor, index) => (
                <div key={donor.id} data-aos="fade-up" data-aos-delay={(index % 9) * 50}>
                  <DonorCard donor={donor} />
                </div>
              ))}
            </div>
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(p) => fetchDonors(p)}
            />
          </>
        ) : (
          <div className="text-center py-20 bg-bg-surface border border-dashed border-border-strong rounded-3xl">
            <h3 className="text-2xl font-bold text-text-base mb-2">No donors found</h3>
            <p className="text-text-muted mb-6">Try adjusting your search criteria or filters.</p>
            <button 
              onClick={() => {
                setSearch('');
                setBloodGroup('All groups');
                setDistrict('');
                setGender('All');
                setSortBy('createdAt');
                setSortOrder('desc');
              }} 
              className="text-primary font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

    </div>
  )
}
