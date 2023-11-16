import logo from "../../../assets/logo.svg";
export default function Header() {
  return (
    <div className="border h-18 p-4 flex justify-center  shadow">
      <div>
        <img src={logo} alt="" width={150} />
      </div>
    </div>
  );
}
