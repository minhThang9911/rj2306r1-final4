import FileBase64 from "react-file-base64";
import { defaultImgSrc } from "~/config";

function Img({ src, alt = "", images, setImages, className = "", index }) {
	const isDefault = src === defaultImgSrc || typeof src === "undefined";
	return (
		<div className={`p-2 relative ${className}`}>
			<img
				className="block w-full aspect-square rounded-3xl object-cover"
				src={typeof src === "undefined" ? defaultImgSrc : src}
				alt={alt}
			/>
			<div className="group absolute inset-x-0 inset-y-0 hover:backdrop-blur-sm transition-all">
				<div className="group-hover:flex hidden absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white transition-all w-3/4 justify-between">
					<label
						className={`block leading-6 p-3 rounded-xl cursor-pointer m-3 bg-black bg-opacity-50 text-center hover:bg-gray-800 transition-all whitespace-nowrap ${
							isDefault ? "w-full" : "w-5/12"
						}`}>
						{isDefault ? "Thêm ảnh" : "Đổi ảnh"}
						<FileBase64
							multiple={false}
							onDone={({ base64 }) => {
								const tmp = [...images];
								tmp[index] = base64;
								setImages(tmp);
							}}
							onChange={(e) => e.target.files[0]}
						/>
					</label>
					{!isDefault && (
						<button
							className="block leading-6 p-3 rounded-xl m-3 bg-red-600 bg-opacity-50 w-5/12 hover:bg-red-400 transition-all whitespace-nowrap"
							onClick={() => {
								const tmp = [...images];
								tmp[index] = defaultImgSrc;
								setImages(tmp);
							}}>
							Xóa ảnh
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Img;
