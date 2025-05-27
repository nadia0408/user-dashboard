import { Link, useLocation } from 'react-router-dom';


const links = [
  { name: 'Posts', to: '/posts' },
  { name: 'Comments', to: '/comments' },
  { name: 'Albums', to: '/albums' },
  { name: 'Photos', to: '/photos' },
  { name: 'Todos', to: '/todos' },
  { name: 'Users', to: '/users' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-60 h-screen bg-gray-100 p-4 shadow-md">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`block p-2 my-2 rounded ${
            location.pathname === link.to ? 'bg-red-500 text-white' : 'text-black'
          }`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};
export default Sidebar;
