import { useLoading } from "../context/LoadingContext";

const GlobalLoader = () => {
  const { loading } = useLoading();
  if (!loading) return null;

  return (
    <div className="global-loader">
      <div className="spinner"></div>
    </div>
  );
};

export default GlobalLoader;
