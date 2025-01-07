type TitlePros = {
  name: string;
};
const Title = ({ name }: TitlePros) => {
  return (
    <div>
      <h2 className="font-bold text-blue-700 text-2xl">{name}</h2>
    </div>
  );
};

export default Title;
