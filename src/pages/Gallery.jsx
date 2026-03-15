export default function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
    "https://images.unsplash.com/photo-1601050690117-94f5f6fa0b3c",
    "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    "https://images.unsplash.com/photo-1601050690117-94f5f6fa0b3c",
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
  ]
  return (
    <div className="px-20 py-20">
      <h1 className="text-3xl font-bold mb-10">
        Gallery
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {images.map((img, i) => (
          <img key={i} src={img} className="rounded-xl" />
        ))}
      </div>
    </div>
  )
}