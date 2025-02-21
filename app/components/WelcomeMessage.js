import Link from "next/link";

const WelcomeMessage = ({ username }) => {
  return (
    <div className="relative z-10 text-center">
      {username ? (
        <>
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800 tracking-wide font-serif">
                Selamat datang, {username}!  
            </h2>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto text-center">
            Selamat menjelajahi pencarian kerja dan mulai kelola postingan pekerjaan Anda dengan mudah!  
            <br /><br />
            Ingin menemukan pekerjaan impian? <span className="font-semibold text-blue-600">Gulir ke bawah</span> untuk melihat berbagai lowongan terbaru yang sesuai dengan keahlian Anda.  
            <br /><br />
            Jika Anda ingin mengelola atau mempublikasikan lowongan pekerjaan, akses menu <span className="font-semibold text-blue-600">&quot;Manage Jobs&quot;</span> di profil pengguna Anda.  
            </p>
        </>
      ) : (
        <>
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800 tracking-wide font-serif">
            Temukan Peluang, <br /> Wujudkan Karier Impian  
          </h2>
          <p className="text-gray-600 mt-4 max-w-4xl mx-auto">
            Jelajahi berbagai peluang kerja yang sesuai dengan keahlian dan tujuan Anda. Baik Anda mencari pekerjaan tetap, freelance, atau proyek jangka pendek, semuanya ada di sini!  
            <span className="font-semibold text-blue-600"> Gulir ke bawah</span> untuk melihat daftar pekerjaan terbaru.  
            <br /><br />
            Ingin merekrut tenaga profesional atau menawarkan jasa?  
            <span className="font-semibold text-blue-600"> Login</span> terlebih dahulu untuk mengelola postingan pekerjaan Anda dan menemukan kandidat terbaik dalam hitungan menit!  
          </p>
          <Link href="/login">
            <button className="border-2 border-blue-500 shadow-lg text-blue-500 bg-transparent mt-5 px-6 py-4 rounded-full hover:bg-blue-500 hover:text-white transition-all">
              LOGIN 🚀
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default WelcomeMessage;
