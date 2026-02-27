const Header = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-12 h-12 bg-red-700 text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-lg">
          S
        </div>
        <div className="text-left">
          <h2 className="font-serif text-lg font-semibold">Shravan Singh</h2>
          <span className="text-xs tracking-widest text-gray-400 uppercase">
            Society
          </span>
        </div>
      </div>

      <p className="text-red-700 uppercase text-sm tracking-widest mb-2">
        Make a Difference
      </p>

      <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
        Your generosity <span className="text-red-700">changes lives.</span>
      </h1>

      <p className="text-gray-500 max-w-xl mx-auto">
        Every rupee you donate goes directly toward campaigns that uplift
        communities and create lasting change.
      </p>
    </div>
  );
};

export default Header;