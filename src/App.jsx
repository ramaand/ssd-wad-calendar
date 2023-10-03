import Calendar from '~/components/calendar/Calendar'

function App() {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center px-2 md:py-8 sm:px-8 md:px-12 lg:px-20 my-2 gap-4">
      <div className="text-center text-2xl font-semibold">Calendar</div>

      <Calendar />
    </main>
  );
}

export default App;
