import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  
  useEffect(() => {
    const getTour = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tours/${id}`);
        setTour(response.data);
      } catch (error) {
        toast.error("Không tìm thấy tour");
        navigate("/list");
      }
    };
    getTour();
  }, [id, navigate]);

  if (!tour) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-8">
          <p className="text-gray-600">Tour không tồn tại</p>
          <button
            onClick={() => navigate("/list")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chi tiết Tour</h1>
        <button
          onClick={() => navigate("/list")}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
        >
          Quay lại danh sách
        </button>
      </div>

      {/* Tour Detail Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Tour Image */}
        <div className="relative">
          <img
            src={tour.image}
            alt={tour.name}
            className="w-full h-96 object-cover"
            onError={(e) => {
              e.target.src = "https://picsum.photos/800/400?random=default";
            }}
          />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              tour.active
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {tour.active ? 'Đang hoạt động' : 'Không hoạt động'}
            </span>
          </div>
        </div>

        {/* Tour Info */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{tour.name}</h2>
                <div className="flex items-center space-x-2">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {tour.category === 'tour-noi-dia' ? 'Tour nội địa' :
                     tour.category === 'tour-quoc-te' ? 'Tour quốc tế' : 'Tour theo yêu cầu'}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium w-24">Điểm đến:</span>
                  <span>{tour.destination}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-24">Thời gian:</span>
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-24">Giá:</span>
                  <span className="text-xl font-bold text-green-600">
                    {tour.price?.toLocaleString()} VND
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-24">Số chỗ:</span>
                  <span>{tour.available || 0} chỗ</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Mô tả</h3>
                <p className="text-gray-700 leading-relaxed">
                  {tour.description || "Chưa có mô tả cho tour này."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => navigate(`/edit/${tour.id}`)}
                  className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => {
                    if (confirm('Bạn có chắc chắn muốn xóa tour này?')) {
                      axios.delete(`http://localhost:3000/tours/${tour.id}`)
                        .then(() => {
                          toast.success('Xóa tour thành công');
                          navigate('/list');
                        })
                        .catch(() => toast.error('Lỗi khi xóa tour'));
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;