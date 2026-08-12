import { MapPin, Droplet, CheckCircle, Calendar, Phone, Mail, ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/axios'
import DonorCard from '../components/DonorCard'

interface DonorData {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  bloodGroup: string;
  district: string | null;
  gender: string | null;
  lastDonationDate: string | null;
  isVerified: boolean;
  availableForDonation: boolean;
  createdAt: string;
}

export default function DonorDetails() {
  const { id } = useParams<{ id: string }>();
  const [donor, setDonor] = useState<DonorData | null>(null);
  const [relatedDonors, setRelatedDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonor = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/donors/${id}`);
        setDonor(response.data.data);
        setRelatedDonors(response.data.relatedDonors || []);
      } catch (error) {
        setDonor(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDonor();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!donor) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-text-base mb-4">Donor not found</h2>
        <Link to="/find-blood" className="text-primary font-bold hover:underline">← Back to donors</Link>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-bg-subtle py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <Link to="/find-blood" className="inline-flex items-center gap-2 text-text-muted hover:text-primary font-medium mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to donors
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Donor Overview */}
          <div className="lg:col-span-1">
            <div className="bg-bg-surface p-8 rounded-3xl border border-border-subtle shadow-sm text-center sticky top-24">
              <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center font-black text-4xl mx-auto mb-4 border-4 border-primary/20">
                {donor.firstName[0]}{donor.lastName?.[0] || ''}
              </div>
              <h1 className="text-2xl font-bold text-text-base">{donor.firstName} {donor.lastName}</h1>
              {donor.district && (
                <p className="text-text-muted text-sm flex items-center justify-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5" /> {donor.district}
                </p>
              )}

              <div className="mt-6 pt-6 border-t border-border-subtle space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-muted">Blood Group</span>
                  <span className="font-black text-primary bg-primary/10 px-3 py-1 rounded-lg">{donor.bloodGroup}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-muted">Status</span>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${donor.availableForDonation ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {donor.availableForDonation ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                {donor.isVerified && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-muted">Verified</span>
                    <span className="flex items-center gap-1 text-green-600 text-xs font-bold">
                      <CheckCircle className="w-4 h-4" /> Verified Donor
                    </span>
                  </div>
                )}
              </div>

              {/* Contact Buttons */}
              <div className="mt-6 space-y-3">
                {donor.phone && (
                  <a href={`tel:${donor.phone}`} className="flex items-center justify-center gap-2 w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover transition shadow-md shadow-primary/20">
                    <Phone className="w-4 h-4" /> Call Donor
                  </a>
                )}
                {donor.email && (
                  <a href={`mailto:${donor.email}`} className="flex items-center justify-center gap-2 w-full bg-bg-subtle text-text-base border border-border-strong font-bold py-3 rounded-xl hover:bg-border-subtle transition">
                    <Mail className="w-4 h-4" /> Send Email
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description / Overview */}
            <div className="bg-bg-surface p-8 rounded-3xl border border-border-subtle shadow-sm">
              <h2 className="text-lg font-bold text-text-base mb-4 flex items-center gap-2">
                <Droplet className="w-5 h-5 text-primary" /> Donor Overview
              </h2>
              <p className="text-text-muted leading-relaxed">
                {donor.firstName} {donor.lastName} is a{donor.isVerified ? ' verified' : ''} blood donor
                {donor.district ? ` based in ${donor.district}` : ''} with blood type <strong className="text-primary">{donor.bloodGroup}</strong>.
                {donor.availableForDonation
                  ? ' They are currently available for donation and ready to help in emergencies.'
                  : ' They are currently not available for donation.'}
                {donor.gender ? ` Gender: ${donor.gender}.` : ''}
              </p>
            </div>

            {/* Key Information */}
            <div className="bg-bg-surface p-8 rounded-3xl border border-border-subtle shadow-sm">
              <h2 className="text-lg font-bold text-text-base mb-6">Key Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-bg-subtle p-4 rounded-xl">
                  <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Blood Group</p>
                  <p className="font-bold text-lg text-primary">{donor.bloodGroup}</p>
                </div>
                <div className="bg-bg-subtle p-4 rounded-xl">
                  <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Gender</p>
                  <p className="font-bold text-lg text-text-base">{donor.gender || 'Not specified'}</p>
                </div>
                <div className="bg-bg-subtle p-4 rounded-xl">
                  <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">District</p>
                  <p className="font-bold text-lg text-text-base">{donor.district || 'Not specified'}</p>
                </div>
                <div className="bg-bg-subtle p-4 rounded-xl">
                  <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Last Donation</p>
                  <p className="font-bold text-lg text-text-base flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-text-muted" />
                    {donor.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'No record'}
                  </p>
                </div>
                <div className="bg-bg-subtle p-4 rounded-xl">
                  <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Member Since</p>
                  <p className="font-bold text-lg text-text-base">
                    {new Date(donor.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </p>
                </div>
                <div className="bg-bg-subtle p-4 rounded-xl">
                  <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Availability</p>
                  <p className={`font-bold text-lg ${donor.availableForDonation ? 'text-green-600' : 'text-red-500'}`}>
                    {donor.availableForDonation ? 'Available Now' : 'Unavailable'}
                  </p>
                </div>
              </div>
            </div>

            {/* Related Donors */}
            {relatedDonors.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-text-base mb-6">Related Donors</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedDonors.slice(0, 3).map((d: any) => (
                    <DonorCard key={d.id} donor={d} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
