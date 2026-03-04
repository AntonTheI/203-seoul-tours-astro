const Review = ({ review }) => {
  return (
    <div
      key={review.name}
      className="max-w-lg flex flex-col justify-center items-center rounded-md gap-4"
    >
      <p className="text-center">{review.review}</p>
      <div className="text-center">
        <p className="font-bold">{review.name}</p>
        <p className="text-sm">{review.country}</p>
      </div>
    </div>
  );
};

export default Review;
