import LoginForm from "../components/LoginForm/LoginForm";

export default function Login() {
  const pageStyle = {
    height: "75vh",
  };

  return (
    <div style={pageStyle}>
      <LoginForm />
    </div>
  );
}
