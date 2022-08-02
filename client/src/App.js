import { Routes, Route } from "react-router-dom";
import UserCreate from "./pages/UserCreate";
import UserDelete from "./pages/UserDelete";
import UserDetail from "./pages/UserDetail";
import UsersList from "./pages/UsersList";
import UserUpdate from "./pages/UserUpdate";

function App() {
    return (
        <div className="App w-full flex min-h-screen flex-col justify-center items-center">
            <Routes>
                <Route path="/" element={<UsersList />} />
                <Route path="create" element={<UserCreate />} />
                <Route path="detail/:id" element={<UserDetail />} />
                <Route path="update/:id" element={<UserUpdate />} />
                <Route path="delete/:id" element={<UserDelete />} />
            </Routes>
        </div>
    );
}

export default App;
