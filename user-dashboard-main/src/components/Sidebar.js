import { Link, useLocation } from 'react-router-dom';

const links = [
  { name: 'Posts', to: '/posts', icon: 'fas fa-file-alt' },
  { name: 'Comments', to: '/comments', icon: 'fas fa-flag' }, // Changed icon to match your old index.html
  { name: 'Albums', to: '/albums', icon: 'fas fa-images' }, // Changed icon
  { name: 'Photos', to: '/photos', icon: 'fas fa-camera-retro' }, // Changed icon
  { name: 'Todos', to: '/todos', icon: 'fas fa-check-square' }, // Changed icon
  { name: 'Users', to: '/users', icon: 'fas fa-users' }, // Changed icon
  { name: 'Kanban', to: '/kanban', icon: 'fas fa-columns' }, // Kanban icon
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-60 bg-gray-200 p-4 space-y-2 flex-shrink-0 h-full shadow-lg"> {/* Matched style of index.html sidebar */}
      <div className="flex items-center gap-2 text-xl font-bold mb-6 text-gray-700">
        {/* You can add a logo here if you want, e.g., from your old index.html */}
        {/* <div className="logo-icon">🔒</div> */}
        <span>Your App</span>
      </div>
      <nav className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 p-2.5 rounded-md text-sm font-medium transition-colors ${
              location.pathname === link.to || (location.pathname === '/' && link.to === '/kanban')
                ? 'bg-red-500 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-300 hover:text-gray-900'
            }`}
          >
            {link.icon && <i className={`${link.icon} w-5 h-5`}></i>}
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;