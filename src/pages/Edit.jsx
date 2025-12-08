import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function Edit() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [available, setAvailable] = useState("");
  const [category, setCategory] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    const getTour = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tours/${id}`);
        const tour = response.data;
        setName(tour.name || "");
        setDestination(tour.destination || "");
        setDuration(tour.duration || "");
        setPrice(tour.price || "");
        setImage(tour.image || "");
        setDescription(tour.description || "");
        setAvailable(tour.available || "");
        setCategory(tour.category || "");
        setActive(tour.active !== undefined ? tour.active : true);
      } catch (error) {
        toast.error("Lỗi không lấy được tour");
      }
    };
    getTour();
  }, [id]);

  const validateData = () => {
    let message = '';

    if (!name || !destination || !price || !duration) {
      message = 'Vui lòng nhập đầy đủ thông tin';
    }

    if (price && isNaN(price)) {
      message = 'Giá phải là số';
    }

    return message;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = validateData();
    if (message) {
      toast.error(message);
      return;
    }

    try {
      const data = {
        name,
        destination,
        duration,
        price: parseInt(price) || 0,
        image,
        description,
        available: parseInt(available) || 0,
        category,
        active,
      };

      await axios.put(`http://localhost:3000/tours/${id}`, data);
      toast.success("Cập nhật tour thành công");
      navigate("/list");
    } catch (error) {
      toast.error( error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">Cập nhật tour</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Tên tour <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="VD: Đà Lạt 4N3D"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="destination" className="block font-medium mb-1">
            Điểm đến <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="VD: Đà Lạt"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div>
          <label htmlFor="duration" className="block font-medium mb-1">
            Thời gian <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="VD: 4 ngày 3 đêm"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div>
          <label htmlFor="price" className="block font-medium mb-1">
            Giá (VND) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="VD: 3200000"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

       <div>
          <label htmlFor="image" className="block font-medium mb-1">
            URL Ảnh
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="VD: https://picsum.photos/400/300?random=3"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Mô tả
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nhập mô tả tour"
            rows="3"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="available" className="block font-medium mb-1">
            Số chỗ còn
          </label>
          <input
            type="number"
            id="available"
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            placeholder="VD: 10"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="block font-medium mb-1">
            Loại tour
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="tour-noi-dia">Tour nội địa</option>
            <option value="tour-quoc-te">Tour quốc tế</option>
            <option value="tour-theo-yeu-cau">Tour theo yêu cầu</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="active"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded border-gray-300 cursor-pointer"
          />
          <label htmlFor="active" className="font-medium cursor-pointer">
            Kích hoạt tour
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
          Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
