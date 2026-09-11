type IncrementButtonProps = {
  onIncrement: () => void;
};

//object destrukturálás
export default function IncrementButton({ onIncrement }: IncrementButtonProps) {
  return (
    <button className="btn btn-info" onClick={onIncrement}>
      count3 növelése
    </button>
  );
}
