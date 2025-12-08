import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function List() {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // State cho tìm kiếm và lọc
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Hàm lọc tours
  const filterTours = () => {
    let filtered = tours;

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      filtered = filtered.filter(tour =>
        tour.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Lọc theo category
    if (categoryFilter) {
      filtered = filtered.filter(tour => tour.category === categoryFilter);
    }

    setFilteredTours(filtered);
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/tours");
        setTours(response.data);
        setFilteredTours(response.data);
      } catch (error) {
        toast.error("Lỗi khi lấy danh sách tours");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  // Lọc khi các filter thay đổi
  useEffect(() => {
    filterTours();
  }, [tours, searchTerm, categoryFilter]);

  
  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Đang tải dữ liệu...</p>
      </div>
    );
  }

  // Xóa tour (DELETE)
    const deleteTour = async (id) => {
        if (!confirm("Bạn chắc chắn muốn xóa Tour này chứ?")) return;
        setLoading(true);
        try {
            await axios.delete(`http://localhost:3000/tours/${id}`);
            setTours(tours.filter((t) => t.id !== id));
            // filteredTours sẽ được cập nhật tự động qua useEffect
            toast.success("Xóa tour thành công");
        } catch (error) {
            toast.error("Lỗi khi xoá tours");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Danh sách tours</h1>
          <Link to="/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Thêm mới
          </Link>
        </div>

        {/* Bộ lọc và tìm kiếm */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tìm kiếm */}
            <div>
              <label className="block font-medium mb-1">
                Tìm kiếm theo tên
              </label>
              <input
                type="text"
                placeholder="Nhập tên tour..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Lọc theo category */}
            <div>
              <label className="block font-medium mb-1">
                Loại tour
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tất cả</option>
                <option value="tour-noi-dia">Tour nội địa</option>
                <option value="tour-quoc-te">Tour quốc tế</option>
                <option value="tour-theo-yeu-cau">Tour theo yêu cầu</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border border-gray-300">STT</th>
                <th className="px-4 py-2 border border-gray-300">Tên tour</th>
                <th className="px-4 py-2 border border-gray-300">Ảnh tour</th>
                <th className="px-4 py-2 border border-gray-300">Địa điểm</th>
                <th className="px-4 py-2 border border-gray-300">Giá</th>
                <th className="px-4 py-2 border border-gray-300">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredTours.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                    {searchTerm || categoryFilter ? 'Không tìm thấy tour nào phù hợp' : 'Chưa có tour nào'}
                  </td>
                </tr>
              ) : (
                filteredTours.map((tour, index) => (
                <tr key={tour.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                  <td className="px-4 py-2 border border-gray-300 font-semibold">
                    {tour.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <img className="w-30" src={tour.image} alt={tour.name} />
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {tour.destination}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {tour.price?.toLocaleString()} VND
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    <div className="flex gap-1 justify-center">
                      <Link to={`/detail/${tour.id}`} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs">
                         Xem
                      </Link>
                      <Link to={`/edit/${tour.id}`} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs">
                         Sửa
                      </Link>
                      <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                      onClick={() => deleteTour(tour.id)}>
                         Xóa
                      </button>
                    </div>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default List;
