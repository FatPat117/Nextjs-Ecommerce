// app/admin/layout.tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
        return (
                <div className="min-h-screen flex bg-gray-100 text-gray-900">
                        {/* Sidebar */}
                        <aside className="w-64 bg-gray-900 text-white flex flex-col p-6 shadow-lg">
                                <div className="mb-8">
                                        <h1 className="text-2xl font-bold text-yellow-400 tracking-wide">
                                                Admin Panel
                                        </h1>
                                        <p className="text-sm text-gray-400 mt-1">Quản lý hệ thống</p>
                                </div>

                                <nav className="flex-1">
                                        <ul className="space-y-3">
                                                <li>
                                                        <a
                                                                href="/admin"
                                                                className="block px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-yellow-300 transition-colors"
                                                        >
                                                                🏠 Dashboard
                                                        </a>
                                                </li>
                                                <li>
                                                        <a
                                                                href="/admin/products"
                                                                className="block px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-yellow-300 transition-colors"
                                                        >
                                                                🛍️ Products
                                                        </a>
                                                </li>
                                                <li>
                                                        <a
                                                                href="/admin/orders"
                                                                className="block px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-yellow-300 transition-colors"
                                                        >
                                                                📦 Orders
                                                        </a>
                                                </li>
                                        </ul>
                                </nav>

                                <footer className="mt-auto pt-4 border-t border-gray-700 text-sm text-gray-400">
                                        © {new Date().getFullYear()} Admin System
                                </footer>
                        </aside>

                        {/* Main Content */}
                        <main className="flex-1 p-8 overflow-y-auto">
                                <div className="bg-white rounded-2xl shadow-sm p-6 min-h-[80vh]">{children}</div>
                        </main>
                </div>
        );
}
