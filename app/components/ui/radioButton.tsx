type RadioInfo = {
  id: string,
  name: string;
} 

type RadioProps = {
  radioInfos: RadioInfo[]
  error?: string;
} 

const RadioButton = ({ radioInfos, error, ...props }: RadioProps) => {
  return (
    <div className="flex gap-10">
      {radioInfos.map((radioInfo, index) => (
        <div key={radioInfo.id}>
          <input
            type="radio"
            name={radioInfo.name}
            value={radioInfo.id}
            id={radioInfo.id}
            defaultChecked={index === 0}
            {...props}
          />
          <label htmlFor={radioInfo.id}>{radioInfo.id}</label>
        </div>
      ))}
      {error && <p>{error}</p>}
    </div>
  );
};

export default RadioButton;
