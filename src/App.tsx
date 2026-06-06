import React, { useState, useEffect } from 'react';
import { ArrowLeft, BarChart3, CalendarDays, CheckCircle2, Clock, FolderKanban, HeartHandshake, Lock, Mail, MapPin, MessageSquare, Plus, Send, ShieldCheck, Sparkles, TrendingUp, Users, X } from 'lucide-react';

// Sub-components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DigitalMading from './components/DigitalMading';
import CommunityMap from './components/CommunityMap';
import Matchmaking from './components/Matchmaking';
import SkillOffer from './components/SkillOffer';
import ImpactDashboard from './components/ImpactDashboard';
import PostSolutionModal from './components/PostSolutionModal';

// Static / Initial Datasets
import { 
  initialStickyNotes, 
  initialMapPins, 
  initialMatchmakingItems, 
  initialSocialStats, 
  initialChartData 
} from './data/initialData';

// Types
import { StickyNote, MapPin as PinType, MatchmakingItem, SocialImpactStats, ChartData } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTopicComment, setNewTopicComment] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('admin@susi-bandung.id');
  
  // Whiteboard sticky notes and cartographic map pins
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>(initialStickyNotes);
  const [mapPins, setMapPins] = useState<PinType[]>(initialMapPins);
  const [matchmakingItems, setMatchmakingItems] = useState<MatchmakingItem[]>(initialMatchmakingItems);
  
  // Personal active leader records state
  const [userSkills, setUserSkills] = useState<string[]>(['Teaching']); // Default starting skill tag
  const [socialStats, setSocialStats] = useState<SocialImpactStats>(initialSocialStats);
  const [chartData, setChartData] = useState<ChartData[]>(initialChartData);
  const [commentsMap, setCommentsMap] = useState<Record<string, string[]>>({
    'note-1': [
      'Saya bersedia hadir jam 7 pagi! Mau bawa plastik sampah sendiri atau disiapkan?',
      'Bagus sekali inisiatifnya. Mari bersihkan sungai kita.',
      'Sangat mendukung! Semoga banyak warga Bandung yang ikut berpartisipasi.'
    ],
    'note-2': [
      'Saya menguasai Python dasar dan bersedia menjadi asisten mentor.',
      'Apakah kegiatannya diadakan offline di Bandung Creative Hub?',
      'Boleh diajak keponakan saya yang masih SMP?'
    ],
    'note-3': [
      'Inisiatif mantap. Jalanan Gang Hijau memang agak gelap saat malam.',
      'Saya ada kenalan distributor solar lamp harga terjangkau.'
    ],
    'note-4': [
      'Siap mendonasikan beras dan bahan makanan segar hari Sabtu ini.',
      'Semoga berkah untuk para lansia kita, amin!'
    ],
  });

  // Notifications system state
  const [notifications, setNotifications] = useState<string[]>([
    'Selamat datang, Pemimpin Komunitas! Dashboard fungsional aktif terhubung ke Kota Bandung.',
    'Pengorbanan waktu: Kegiatan kerja bakti Sungai Cikapundung diadakan Minggu ini pukul 07:00 WIB.',
    'Saran AI: Tambahkan keahlian Anda di panel "Offer a Skill" untuk meranking kecocokan grup mitigasi.'
  ]);

  // Active toast alerting queue
  const [activeToast, setActiveToast] = useState<string | null>(null);

  // Modals visibility toggles
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Trigger alert notice helper
  const addNotification = (msg: string) => {
    setNotifications(prev => [msg, ...prev]);
    setActiveToast(msg);
  };

  // Close toast helper
  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => {
        setActiveToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeToast]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, activeTopicId]);

  const handleIncrementVolunteers = () => {
    setSocialStats(prev => ({
      ...prev,
      activeVolunteers: prev.activeVolunteers + 1
    }));
  };

  // List skill set submit click callback
  const handleListSkiilSubmitted = (commitment: string, availability: string) => {
    // Increment volunteer statistics
    setSocialStats(prev => ({
      ...prev,
      skillDonations: prev.skillDonations + 1,
      totalHours: prev.totalHours + 12 // Assume average contribution block of 12 impact hours
    }));

    // Add randomized month contribution index to simulated chart Data
    setChartData(prev => prev.map(m => {
      if (m.month === 'Jun') {
        return { ...m, hours: m.hours + 120 }; // Raise June peak limit
      }
      return m;
    }));

    addNotification(`Berhasil mendaftarkan keahlian: "${userSkills.slice(-1)}" tersedia untuk ${commitment} di ${availability}!`);
  };

  // Post a direct Solution submission coordinator callback
  const handleCreateSolutionSubmission = (newNote: StickyNote, newPin: PinType) => {
    setStickyNotes(prev => [newNote, ...prev]);
    setMapPins(prev => [...prev, newPin]);

    // Lift counters index
    setSocialStats(prev => ({
      ...prev,
      projectsDone: prev.projectsDone + 1,
      solutionsSolved: prev.solutionsSolved + 1,
      activeVolunteers: prev.activeVolunteers + 28, // Adds local team size estimate
    }));

    // Update charts data slightly
    setChartData(prev => prev.map(m => {
      if (m.month === 'Jun') {
        return { ...m, hours: m.hours + 450 }; // Raise June peak limit significantly
      }
      return m;
    }));

    addNotification(`Solusi baru disebarkan: "${newNote.title}" berhasil di-pin pada peta Bandung di koordinat [${newPin.x}%, ${newPin.y}%]!`);
    setIsPostModalOpen(false);
  };

  const handleOpenTopic = (noteId: string) => {
    setActiveTab('forum');
    setActiveTopicId(noteId);
    setNewTopicComment('');
  };

  const handleSidebarTabChange = (tabId: string) => {
    setActiveTopicId(null);
    setActiveTab(tabId);
    setNewTopicComment('');
  };

  const handleTopicCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTopicId || !newTopicComment.trim()) return;

    setCommentsMap(prev => ({
      ...prev,
      [activeTopicId]: [...(prev[activeTopicId] || []), newTopicComment.trim()]
    }));

    setStickyNotes(prev => prev.map(note => (
      note.id === activeTopicId ? { ...note, comments: note.comments + 1 } : note
    )));

    setNewTopicComment('');
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdminLoggedIn(true);
    setActiveTab('admin');
    addNotification(`Admin login berhasil untuk ${adminEmail}.`);
  };

  const renderPageHeader = (eyebrow: string, title: string, description: string) => (
    <section className="flex flex-col md:flex-row md:items-end justify-between gap-5 bg-white p-5 sm:p-7 rounded-lg border border-outline-variant/45 shadow-xs">
      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-wide">
          <Sparkles size={11} className="animate-pulse" />
          <span>{eyebrow}</span>
        </span>
        <h1 className="font-display font-black text-2xl sm:text-4xl text-on-surface leading-tight">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl font-medium leading-relaxed">
          {description}
        </p>
      </div>
      <button 
        onClick={() => setIsPostModalOpen(true)}
        className="bg-primary hover:bg-primary-container text-white px-5 py-3 rounded-lg font-display text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:translate-y-[-1px] active:scale-95 transition-all shrink-0 cursor-pointer"
      >
        <Plus size={16} />
        <span>Post a Solution</span>
      </button>
    </section>
  );

  const renderPlaceholderPage = (title: string, description: string) => (
    <div className="space-y-6">
      {renderPageHeader('Feature Workspace', title, description)}
      <section className="bg-white rounded-lg border border-outline-variant/45 p-8 text-center">
        <p className="text-sm font-semibold text-on-surface">
          Halaman ini sudah dipisahkan dari dashboard utama dan siap dikembangkan.
        </p>
        <p className="text-xs text-on-surface-variant mt-2">
          Gunakan menu sidebar untuk berpindah ke fitur lain tanpa menumpuk semua konten di satu layar.
        </p>
      </section>
    </div>
  );

  const renderTopicPage = () => {
    const topic = stickyNotes.find(note => note.id === activeTopicId);

    if (!topic) {
      return (
        <div className="space-y-6">
          {renderPageHeader('Civic Exchange', 'Topik Tidak Ditemukan', 'Topik yang kamu buka tidak tersedia lagi di mading.')}
          <button
            type="button"
            onClick={() => setActiveTopicId(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-container"
          >
            <ArrowLeft size={14} />
            <span>Kembali ke mading</span>
          </button>
        </div>
      );
    }

    const comments = commentsMap[topic.id] || [];

    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => setActiveTopicId(null)}
          className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-container"
        >
          <ArrowLeft size={14} />
          <span>Kembali ke mading</span>
        </button>

        <section className="bg-white rounded-lg border border-outline-variant/45 overflow-hidden shadow-xs">
          <div className="p-5 sm:p-7 border-b border-outline-variant/40" style={{ borderLeft: `8px solid ${topic.pinColor}` }}>
            <span
              className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md tracking-wide inline-block"
              style={{ backgroundColor: topic.tagBg, color: topic.tagText }}
            >
              {topic.category}
            </span>
            <h1 className="font-display font-black text-2xl sm:text-4xl text-on-surface leading-tight mt-3">
              {topic.title}
            </h1>
            <p className="text-sm text-on-surface-variant leading-relaxed mt-3 max-w-3xl">
              {topic.description}
            </p>
            <div className="flex flex-wrap gap-3 mt-4 text-[11px] font-bold text-on-surface-variant">
              <span>{topic.views} Penayangan</span>
              <span>{topic.comments} Komentar</span>
              <span>Diposting oleh Community Leader</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-0">
            <div className="p-5 sm:p-7 space-y-4">
              <div className="flex items-center gap-2">
                <MessageSquare size={17} className="text-primary" />
                <h2 className="font-display font-bold text-base text-on-surface">
                  Diskusi Komunitas
                </h2>
              </div>

              <div className="space-y-3">
                {comments.length === 0 ? (
                  <p className="text-sm text-on-surface-variant bg-surface-container-low border border-outline-variant/35 rounded-lg p-4">
                    Belum ada komentar. Jadilah yang pertama memberi saran untuk topik ini.
                  </p>
                ) : (
                  comments.map((comment, index) => (
                    <div key={`${topic.id}-${index}`} className="p-4 bg-surface rounded-lg border border-outline-variant/30">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-display font-extrabold text-xs text-primary">
                          Warga {index % 2 === 0 ? 'Bandung' : 'Cimahi'} #{index + 10}
                        </span>
                        <span className="text-[10px] text-on-surface-variant font-semibold">Baru saja</span>
                      </div>
                      <p className="text-sm text-on-surface leading-relaxed mt-2">
                        {comment}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <aside className="p-5 sm:p-7 bg-surface-container-low border-t lg:border-t-0 lg:border-l border-outline-variant/40">
              <form onSubmit={handleTopicCommentSubmit} className="space-y-3">
                <label className="font-display font-bold text-sm text-on-surface block">
                  Tambah Komentar
                </label>
                <textarea
                  value={newTopicComment}
                  onChange={(e) => setNewTopicComment(e.target.value)}
                  rows={5}
                  placeholder="Tulis saran, dukungan, atau pertanyaan untuk topik ini..."
                  className="w-full bg-white outline-hidden text-sm p-3 rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
                <button
                  type="submit"
                  disabled={!newTopicComment.trim()}
                  className="w-full bg-primary hover:bg-primary-container disabled:opacity-40 text-white rounded-lg py-3 text-sm font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Send size={15} />
                  <span>Kirim Komentar</span>
                </button>
              </form>
            </aside>
          </div>
        </section>
      </div>
    );
  };

  const renderProjectsPage = () => {
    const projects = [
      {
        title: 'Revitalisasi Taman Lansia',
        status: 'In Progress',
        area: 'Citarum',
        volunteers: 38,
        date: '16 Jun 2026',
        description: 'Penanaman pohon teduh, perbaikan bangku, dan pembersihan jalur pejalan kaki.'
      },
      {
        title: 'Kelas Coding Bandung Creative Hub',
        status: 'Open Volunteers',
        area: 'Cicendo',
        volunteers: 24,
        date: '20 Jun 2026',
        description: 'Workshop Python dasar untuk siswa SMA dengan mentor komunitas teknologi lokal.'
      },
      {
        title: 'Bank Sampah Cibaduyut',
        status: 'Planning',
        area: 'Bojongloa Kidul',
        volunteers: 17,
        date: '24 Jun 2026',
        description: 'Membangun sistem sortir sampah warga dan jadwal penjemputan mingguan.'
      }
    ];

    return (
      <div className="space-y-6">
        {renderPageHeader('Project Workspace', 'Projects Bandung', 'Contoh daftar proyek komunitas beserta status, lokasi, jadwal, dan kebutuhan relawan.')}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <article key={project.title} className="bg-white rounded-lg border border-outline-variant/45 p-5 shadow-xs">
              <div className="flex items-start justify-between gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <FolderKanban size={18} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wide bg-surface-container text-on-surface-variant px-2 py-1 rounded-md">
                  {project.status}
                </span>
              </div>
              <h3 className="font-display font-bold text-base text-on-surface mt-4">
                {project.title}
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mt-2">
                {project.description}
              </p>
              <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] font-semibold text-on-surface-variant">
                <span className="flex items-center gap-1.5"><MapPin size={12} />{project.area}</span>
                <span className="flex items-center gap-1.5"><Users size={12} />{project.volunteers} relawan</span>
                <span className="col-span-2 flex items-center gap-1.5"><CalendarDays size={12} />{project.date}</span>
              </div>
              <button className="mt-5 w-full bg-primary/5 hover:bg-primary hover:text-white text-primary rounded-lg py-2.5 text-xs font-bold transition-colors">
                Lihat Detail Proyek
              </button>
            </article>
          ))}
        </section>
      </div>
    );
  };

  const renderCommunitiesPage = () => {
    const communities = [
      { name: 'Bandung Tech Mentor', members: 146, focus: 'Edukasi digital', area: 'Bandung Wetan' },
      { name: 'Cikapundung Care', members: 92, focus: 'Lingkungan sungai', area: 'Coblong' },
      { name: 'Dapur Sosial Cicendo', members: 58, focus: 'Distribusi makanan', area: 'Cicendo' },
      { name: 'Cibaduyut Circular Hub', members: 73, focus: 'Bank sampah dan UMKM', area: 'Bojongloa Kidul' }
    ];

    return (
      <div className="space-y-6">
        {renderPageHeader('Community Directory', 'Communities Bandung', 'Contoh direktori komunitas yang bisa diajak kolaborasi berdasarkan fokus dan wilayah.')}
        <section className="bg-white rounded-lg border border-outline-variant/45 overflow-hidden shadow-xs">
          <div className="grid grid-cols-12 gap-3 px-5 py-3 bg-surface-container-low border-b border-outline-variant/40 text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">
            <span className="col-span-5">Komunitas</span>
            <span className="col-span-3 hidden sm:block">Fokus</span>
            <span className="col-span-2 hidden md:block">Wilayah</span>
            <span className="col-span-7 sm:col-span-4 md:col-span-2 text-right">Anggota</span>
          </div>
          {communities.map((community) => (
            <div key={community.name} className="grid grid-cols-12 gap-3 px-5 py-4 border-b last:border-b-0 border-outline-variant/25 items-center">
              <div className="col-span-5 flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Users size={17} />
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-sm text-on-surface truncate">{community.name}</p>
                  <p className="text-[11px] text-on-surface-variant sm:hidden">{community.focus}</p>
                </div>
              </div>
              <span className="col-span-3 hidden sm:block text-xs text-on-surface-variant font-medium">{community.focus}</span>
              <span className="col-span-2 hidden md:block text-xs text-on-surface-variant font-medium">{community.area}</span>
              <span className="col-span-7 sm:col-span-4 md:col-span-2 text-right text-sm font-black text-primary">{community.members}</span>
            </div>
          ))}
        </section>
      </div>
    );
  };

  const renderLoginPage = () => (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 items-stretch">
      <section className="bg-white rounded-lg border border-outline-variant/45 p-6 sm:p-8 shadow-xs flex flex-col justify-between min-h-[460px]">
        <div>
          <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-wide">
            <Lock size={12} />
            Admin Access
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-on-surface leading-tight mt-4">
            Login Admin SUSI Bandung
          </h1>
          <p className="text-sm text-on-surface-variant leading-relaxed mt-3 max-w-xl">
            Tampilan masuk untuk pengelola platform, validasi konten mading, pengawasan proyek, dan moderasi komunitas.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
          {[
            ['12', 'Topik menunggu review'],
            ['8', 'Proyek aktif'],
            ['4', 'Komunitas baru']
          ].map(([value, label]) => (
            <div key={label} className="bg-surface-container-low border border-outline-variant/35 rounded-lg p-4">
              <span className="font-display font-black text-2xl text-primary">{value}</span>
              <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wide mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-lg border border-outline-variant/45 p-6 shadow-xs">
        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <h2 className="font-display font-bold text-xl text-on-surface">Masuk</h2>
            <p className="text-xs text-on-surface-variant mt-1">Gunakan akun admin contoh untuk melihat dashboard.</p>
          </div>
          <label className="block space-y-1.5">
            <span className="text-xs font-bold text-on-surface">Email</span>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg py-3 pl-10 pr-3 text-sm outline-hidden focus:ring-2 focus:ring-primary focus:bg-white"
              />
            </div>
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-bold text-on-surface">Password</span>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="password"
                defaultValue="adminbandung"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg py-3 pl-10 pr-3 text-sm outline-hidden focus:ring-2 focus:ring-primary focus:bg-white"
              />
            </div>
          </label>
          <button type="submit" className="w-full bg-primary hover:bg-primary-container text-white rounded-lg py-3 font-bold text-sm transition-colors">
            Login ke Admin Dashboard
          </button>
          <p className="text-[11px] text-on-surface-variant leading-relaxed">
            Ini masih UI simulasi. Integrasi autentikasi sungguhan bisa disambungkan ke backend nanti.
          </p>
        </form>
      </section>
    </div>
  );

  const renderAdminPage = () => (
    <div className="space-y-6">
      {renderPageHeader('Admin Dashboard', 'Panel Admin Bandung', 'Kelola topik mading, proyek, komunitas, dan metrik kontribusi dari satu ruang kontrol.')}
      {!isAdminLoggedIn && (
        <section className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm font-semibold text-amber-900">
            Kamu melihat mode preview. Login untuk menandai sesi admin aktif.
          </p>
          <button onClick={() => setActiveTab('login')} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-xs font-bold">
            Buka Login
          </button>
        </section>
      )}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[
          [MessageSquare, 'Topik Aktif', stickyNotes.length.toString()],
          [FolderKanban, 'Proyek Aktif', '8'],
          [Users, 'Komunitas', '14'],
          [HeartHandshake, 'Donasi Skill', socialStats.skillDonations.toString()]
        ].map(([Icon, label, value]) => {
          const StatIcon = Icon as typeof MessageSquare;
          return (
            <div key={label as string} className="bg-white rounded-lg border border-outline-variant/45 p-4">
              <StatIcon size={18} className="text-primary" />
              <p className="font-display font-black text-2xl text-on-surface mt-3">{value as string}</p>
              <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">{label as string}</p>
            </div>
          );
        })}
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-outline-variant/45 p-5">
          <h3 className="font-display font-bold text-base text-on-surface flex items-center gap-2">
            <ShieldCheck size={17} className="text-primary" />
            Moderasi Terbaru
          </h3>
          <div className="space-y-3 mt-4">
            {stickyNotes.slice(0, 4).map((note) => (
              <div key={note.id} className="flex items-center justify-between gap-3 border border-outline-variant/30 rounded-lg p-3">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-on-surface truncate">{note.title}</p>
                  <p className="text-[11px] text-on-surface-variant">{note.category} - {note.comments} komentar</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">Approved</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-outline-variant/45 p-5">
          <h3 className="font-display font-bold text-base text-on-surface flex items-center gap-2">
            <TrendingUp size={17} className="text-primary" />
            Aktivitas Sistem
          </h3>
          <div className="space-y-3 mt-4">
            {[
              'Map Bandung menerima 3 marker baru minggu ini.',
              '2 komunitas mengajukan verifikasi profil.',
              'Laporan dampak bulanan siap diekspor.',
              'Forum mading memiliki kenaikan diskusi 18%.'
            ].map((item) => (
              <div key={item} className="flex gap-3 text-sm text-on-surface-variant">
                <Clock size={14} className="text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderActivePage = () => {
    switch (activeTab) {
      case 'forum':
        if (activeTopicId) {
          return renderTopicPage();
        }

        return (
          <div className="space-y-6">
            {renderPageHeader('Civic Exchange', 'Digital Mading', 'Kelola ide, diskusi, dan dukungan warga dalam satu papan komunitas.')}
            <DigitalMading 
              stickyNotes={stickyNotes} 
              setStickyNotes={setStickyNotes}
              onPostClick={() => setIsPostModalOpen(true)}
              searchQuery={searchQuery}
              onOpenTopic={handleOpenTopic}
            />
          </div>
        );

      case 'map':
        return (
          <div className="space-y-6">
            {renderPageHeader('Bandung City Map', 'Community Map Bandung', 'Pantau pin aksi warga dan titik kebutuhan komunitas di Kota Bandung.')}
            <CommunityMap 
              pins={mapPins} 
              setPins={setMapPins}
              onNotification={addNotification}
              cityName="Bandung"
              regionName="Kota Bandung"
            />
          </div>
        );

      case 'donation':
        return (
          <div className="space-y-6">
            {renderPageHeader('Skill Donation', 'Donasi Skill', 'Daftarkan kemampuan, waktu, dan ketersediaanmu agar komunitas bisa menemukan bantuan yang tepat.')}
            <div className="max-w-2xl">
              <SkillOffer 
                userSkills={userSkills}
                setUserSkills={setUserSkills}
                onListSkillSubmitted={handleListSkiilSubmitted}
              />
            </div>
          </div>
        );

      case 'matchmaking':
        return (
          <div className="space-y-6">
            {renderPageHeader('AI Matchmaking', 'Rekomendasi Kolaborasi', 'Temukan komunitas dan proyek yang paling cocok dengan skill aktifmu.')}
            <Matchmaking 
              items={matchmakingItems} 
              setItems={setMatchmakingItems}
              userSkills={userSkills}
              onNotification={addNotification}
              onIncrementVolunteers={handleIncrementVolunteers}
            />
          </div>
        );

      case 'dashboard':
        return (
          <div className="space-y-6">
            {renderPageHeader('Impact Dashboard', 'Social Impact Metrics', 'Lihat kontribusi, jam dampak, dan distribusi program komunitas secara terukur.')}
            <ImpactDashboard 
              stats={socialStats}
              chartData={chartData}
              onNotification={addNotification}
            />
          </div>
        );

      case 'projects':
        return renderProjectsPage();

      case 'communities':
        return renderCommunitiesPage();

      case 'login':
        return renderLoginPage();

      case 'admin':
        return renderAdminPage();

      case 'profile':
        return renderPlaceholderPage('Profile', 'Ruang profil pemimpin komunitas, kontribusi pribadi, dan preferensi akun.');

      case 'settings':
        return renderPlaceholderPage('Settings', 'Ruang pengaturan notifikasi, tampilan, dan preferensi platform.');

      case 'home':
      default:
        return (
          <>
            {renderPageHeader('Bandung Impact Network', 'Dashboard Utama Bandung', 'Pantau mading warga, peta solusi Kota Bandung, dan donasi skill tanpa menumpuk semua fitur di layar utama.')}

            <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <DigitalMading 
                stickyNotes={stickyNotes} 
              setStickyNotes={setStickyNotes}
              onPostClick={() => setIsPostModalOpen(true)}
              searchQuery={searchQuery}
              onOpenTopic={handleOpenTopic}
            />

              <CommunityMap 
                pins={mapPins} 
                setPins={setMapPins}
                onNotification={addNotification}
                cityName="Bandung"
                regionName="Kota Bandung"
              />
            </section>

            <section className="max-w-2xl">
              <SkillOffer 
                userSkills={userSkills}
                setUserSkills={setUserSkills}
                onListSkillSubmitted={handleListSkiilSubmitted}
              />
            </section>
          </>
        );
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen overflow-x-hidden font-sans antialiased pb-10">
      {/* Side Bar panel navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={handleSidebarTabChange} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        onPostClick={() => setIsPostModalOpen(true)}
      />

      {/* Main Container block */}
      <main className="md:pl-64 pt-16 min-h-screen">
        
        {/* Fixed Top Head Navigation actions */}
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notifications={notifications}
          clearNotifications={() => setNotifications([])}
        />

        {/* Dashboard Content area */}
        <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
          
          {renderActivePage()}

        </div>
      </main>

      {/* Mobile Sticky Floating Post Action button (FAB) */}
      <button 
        onClick={() => setIsPostModalOpen(true)}
        className="fixed bottom-5 right-5 w-13 h-13 bg-primary hover:bg-primary-container text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all md:hidden z-35 cursor-pointer"
        aria-label="Post a solution"
      >
        <Plus size={24} />
      </button>

      {/* Sliding Dialog Form (Post a civic solution) */}
      {isPostModalOpen && (
        <PostSolutionModal 
          onClose={() => setIsPostModalOpen(false)}
          onSubmit={handleCreateSolutionSubmission}
        />
      )}

      {/* Global Toast Notice Overlay snackbar popup bottom-right */}
      {activeToast && (
        <div className="fixed bottom-5 right-5 left-5 md:left-auto md:w-[360px] bg-neutral-900 border border-neutral-700/80 text-white rounded-lg shadow-2xl p-4 flex gap-3 items-start z-50 animate-in slide-in-from-bottom-8 duration-200">
          <div className="p-1 px-1.5 rounded-md bg-primary/20 text-indigo-400 shrink-0 mt-0.5 animate-pulse">
            <CheckCircle2 size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
              Live Broadcast Info
            </span>
            <p className="text-xs font-semibold text-neutral-100 leading-normal mt-0.5">
              {activeToast}
            </p>
          </div>
          <button 
            onClick={() => setActiveToast(null)}
            className="text-neutral-400 hover:text-white p-0.5 rounded-md"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
