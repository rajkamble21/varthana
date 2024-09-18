import RegisterForm from "../components/RegisterForm/RegisterForm";

export default function Register() {
  const pageStyle = {
    height: "75vh",
  };

  return (
    <div style={pageStyle}>
      <RegisterForm />
    </div>
  );
}
