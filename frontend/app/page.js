import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <div className="gradient-bg">
      <div className="max-w-4xl w-full mx-auto p-8 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2">
          <ContactForm />
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="text-center text-gray-500">
            [Illustration Placeholder: Person on Skateboard with Envelope]
          </div>
        </div>
      </div>
    </div>
  );
}