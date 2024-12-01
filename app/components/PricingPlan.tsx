import { Plan, User } from 'refloat-nextjs-integration/app/types';

interface PricingPlanProps {
  plan: Plan;
  isActive: boolean;
  onCancel: () => void;
}

export default function PricingPlan({ plan, isActive, onCancel }: PricingPlanProps) {
  return (
    <div className="group relative row-start-1 md:col-span-2 lg:w-1/4">
      <div className="absolute top-0 h-full w-full rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-600/10 transition duration-500 group-hover:scale-105 lg:group-hover:scale-110" />
      <div className="relative space-y-8 p-8">
        <h3 className="text-center text-xl font-semibold text-gray-700">{plan.name}</h3>
        <div className="overflow-hidden">
          <div className="-mr-20 flex items-end justify-center">
            <div className="flex">
              <span className="-ml-6 mt-2 text-2xl font-bold text-primary">$</span>
              <span className="leading-0 text-4xl font-bold text-gray-800">{plan.price.int}</span>
            </div>
            <div className="mb-2">
              <span className="block text-xl font-bold text-gray-500">{plan.price.float}</span>
              <span className="block text-xl font-bold text-primary">/ Month</span>
            </div>
          </div>
        </div>

        {isActive && (
          <span className="m-auto mt-4 block w-max rounded-full bg-gradient-to-r from-blue-300 to-blue-500 px-4 py-1 text-sm font-bold text-white">
            {'Current plan'}
          </span>
        )}

        <ul role="list" className="m-auto w-max space-y-4 pb-6 text-gray-600">
          {[1, 2, 3, 4].map((i) => (
            <li key={i} className="space-x-2">
              <span className="font-semibold text-primary">✓</span>
              <span>{`${i}th ${plan.name} advantage`}</span>
            </li>
          ))}
        </ul>

        {isActive ? (
          <button
            onClick={onCancel}
            className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-sky-50 before:border before:border-sky-500 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
          >
            <span className="relative text-base font-semibold text-sky-600">Cancel Plan</span>
          </button>
        ) : (
          <button className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-sky-50 before:border before:border-sky-300 before:transition before:duration-300 cursor-not-allowed">
            <span className="relative text-base font-semibold text-sky-400">Not available</span>
          </button>
        )}
      </div>
    </div>
  );
}
