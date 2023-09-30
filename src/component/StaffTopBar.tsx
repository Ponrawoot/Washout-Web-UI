export default function StaffTopBar() {
  return (
    <nav className="bg-primary-blue p-4 h-0">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
            <div className="text-black text-xl">
                <p>สาขา สี่พระยา</p>
            </div>
          <ul className="flex space-x-4 items-center">
          <li>
              <p>Staff01</p>
            </li>
          <li>
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
