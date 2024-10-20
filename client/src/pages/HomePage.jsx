import Button from '../components/Button';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background text-text">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6">Welcome to Our Dark Theme App</h1>
        <p className="text-lg text-text-secondary mb-8">
          This is a sample home page for our unified dark theme design system.
        </p>
        <Button variant="primary" size="lg">Get Started</Button>
      </div>
    </div>
  );
};

export default HomePage;