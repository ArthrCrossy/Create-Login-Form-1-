import { Search, Bell, User } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <nav className="w-full bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                            Início
                        </a>
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                            Mensagens
                        </a>
                        <Link to="/userpage/contato" className="text-sm text-gray-600 hover:text-gray-900">
                            Contato
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="size-5 text-gray-600" />
                        <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full"></span>
                    </Button>

                    <Button variant="ghost" size="icon">
                        <User className="size-5 text-gray-600" />
                    </Button>
                </div>
            </div>
        </nav>
    );
}
