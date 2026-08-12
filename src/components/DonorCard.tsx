import { Link } from 'react-router-dom';
import { MapPin, Droplet, CheckCircle } from 'lucide-react';

interface DonorCardProps {
  donor: {
    id: string;
    firstName: string;
    lastName: string;
    bloodGroup: string;
    district: string | null;
    gender: string | null;
    availableForDonation?: boolean;
  };
}

export default function DonorCard({ donor }: DonorCardProps) {
  return (
    <div className="bg-bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 bg-red-50 dark:bg-red-900/30 text-primary rounded-xl flex items-center justify-center font-black text-xl border border-red-100 dark:border-red-900/50 shadow-inner shrink-0">
          {donor.bloodGroup}
        </div>
        <div className="min-w-0">
          <h4 className="text-lg font-bold text-text-base flex items-center gap-2 truncate">
            {donor.firstName} {donor.lastName}
            <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
          </h4>
          <div className="flex items-center gap-3 text-sm text-text-muted mt-0.5">
            {donor.district && (
              <span className="flex items-center gap-1 truncate">
                <MapPin className="w-3.5 h-3.5 shrink-0" /> {donor.district}
              </span>
            )}
            {donor.gender && (
              <span className="flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5 shrink-0" /> {donor.gender}
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1">
        {donor.availableForDonation !== false
          ? `Available for donation in ${donor.district || 'their area'}. Blood type ${donor.bloodGroup} donor ready to help in emergencies.`
          : `Currently unavailable for donation. Blood type ${donor.bloodGroup} donor based in ${donor.district || 'their area'}.`}
      </p>

      <Link
        to={`/donor/${donor.id}`}
        className="block w-full text-center bg-primary text-white font-bold py-2.5 rounded-xl hover:bg-primary-hover transition shadow-md shadow-primary/20"
      >
        View Details
      </Link>
    </div>
  );
}
