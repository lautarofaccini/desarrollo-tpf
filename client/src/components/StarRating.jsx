    import { Star } from 'lucide-react';

function StarRating({ rating, setRating }) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
          className={`focus:outline-none transition-colors duration-200 ${
            star <= rating ? "text-yellow-400" : "text-gray-400"
          }`}
        >
          <Star
            fill={star <= rating ? "currentColor" : "none"}
            className="w-8 h-8"
          />
        </button>
      ))}
    </div>
  );
}

export default StarRating;
