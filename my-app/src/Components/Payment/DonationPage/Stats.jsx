const Stats = () => {

const stats = [
  {
    icon: '💰',
    value: '₹1,20,000',
    label: 'Total Raised',
  },
  {
    icon: '🤝',
    value: '350+',
    label: 'Donors',
  },
  {
    icon: '🎯',
    value: '₹2,00,000',
    label: 'Goal',
  },
  {
    icon: '📅',
    value: '15',
    label: 'Days Left',
  },
];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-white rounded-xl p-6 text-center shadow hover:shadow-lg transition"
        >
          <div className="text-2xl mb-2">{s.icon}</div>
          <div className="text-2xl font-serif font-bold text-red-700">
            {s.value}
          </div>
          <div className="text-sm text-gray-500">{s.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats;