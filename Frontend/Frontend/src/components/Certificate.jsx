import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { Download, Award, ShieldCheck } from 'lucide-react';
import QRCode from 'qrcode';
import axiosClient from '../utils/axiosClient';

const Certificate = ({
  userName = 'Rahul Sharma',
  courseName = 'Data Structures & Algorithms',
  date = 'April 03, 2026',
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [certId] = useState(() =>
    'DM-' + Math.floor(100000 + Math.random() * 900000)
  );
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    const id = 'cert-gfonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&family=Dancing+Script:wght@700&family=Montserrat:wght@400;600;700;900&display=swap';
      document.head.appendChild(link);
    }

    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  // ───────────────── DRAW CERTIFICATE ─────────────────
  const drawCertificate = async (ctx, W, H) => {
  const C = {
    dark: '#0f172a',
    gold: '#d4af37',
    gray: '#475569',
    light: '#64748b',
    border: '#e2e8f0',
    bg: '#ffffff',
  };

  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, W, H);

  // ───── Border ─────
  ctx.strokeStyle = C.gold;
  ctx.lineWidth = 8;
  ctx.strokeRect(30, 30, W - 60, H - 60);

  ctx.strokeStyle = C.border;
  ctx.lineWidth = 2;
  ctx.strokeRect(50, 50, W - 100, H - 100);

  // ───── ISO Badge (LEFT) ─────
  const isoX = 120;
  const isoY = 100;

  ctx.beginPath();
  ctx.arc(isoX, isoY, 40, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = C.dark;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = C.dark;
  ctx.font = '900 14px Montserrat';
  ctx.textAlign = 'center';
  ctx.fillText('ISO', isoX, isoY - 5);

  ctx.font = '700 9px Montserrat';
  ctx.fillText('9001:2015', isoX, isoY + 10);

  ctx.font = '700 8px Montserrat';
  ctx.fillStyle = C.light;
  ctx.fillText('CERTIFIED', isoX, isoY + 30);

  // ───── LOGO (CENTER TOP) ─────
  const centerX = W / 2;

  // DM Box Logo
  ctx.fillStyle = C.dark;
  ctx.fillRect(centerX - 170, 60, 50, 50);

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 22px Montserrat';
  ctx.textAlign = 'center';
  ctx.fillText('DM', centerX - 145, 92);

  // Brand Name
  ctx.fillStyle = C.dark;
  ctx.font = '900 40px Montserrat';
  ctx.textAlign = 'left';
  ctx.fillText('DSA MENTOR', centerX - 100, 95);

  // Tagline line
  ctx.fillStyle = C.gold;
  ctx.fillRect(centerX - 100, 105, 200, 4);

  ctx.fillStyle = C.light;
  ctx.font = '600 12px Montserrat';
  ctx.textAlign = 'center';
  ctx.fillText('MASTERING DATA STRUCTURES & ALGORITHMS', centerX, 130);

  // ───── QR CODE & VERIFICATION ID (RIGHT TOP) ─────
  const qrX = W - 150;
  const qrY = 100;
  const verificationUrl = `${window.location.origin}/verify-certificate/${certId}`;
  
  try {
    const qrDataUrl = await QRCode.toDataURL(verificationUrl, { margin: 1, width: 80 });
    const qrImg = new Image();
    await new Promise((resolve) => {
      qrImg.onload = resolve;
      qrImg.src = qrDataUrl;
    });
    ctx.drawImage(qrImg, qrX - 40, qrY - 40, 80, 80);
    
    ctx.fillStyle = C.light;
    ctx.font = '700 10px Montserrat';
    ctx.textAlign = 'center';
    ctx.fillText('VERIFY CERTIFICATE', qrX, qrY + 55);
    ctx.fillText(`ID: ${certId}`, qrX, qrY + 68);
  } catch (err) {
    console.error('QR Error:', err);
  }

  // ───── TITLE ─────
  ctx.fillStyle = C.dark;
  ctx.font = 'italic 900 60px Playfair Display';
  ctx.textAlign = 'center';
  ctx.fillText('Certificate of Completion', W / 2, 220);

  // ───── Subtitle ─────
  ctx.fillStyle = C.light;
  ctx.font = '600 16px Montserrat';
  ctx.fillText('This certificate is proudly presented to', W / 2, 260);

  // ───── Name ─────
  ctx.fillStyle = C.dark;
  ctx.font = '900 60px Montserrat';
  ctx.fillText(userName, W / 2, 340);

  const nameWidth = ctx.measureText(userName).width;
  ctx.fillStyle = C.gold;
  ctx.fillRect(W / 2 - nameWidth / 2, 355, nameWidth, 3);

  // ───── Paragraph ─────
  ctx.fillStyle = C.gray;
  ctx.font = '500 18px Montserrat';
  ctx.fillText(
    'has successfully completed the professional course',
    W / 2,
    400
  );

  // ───── Course Name ─────
  ctx.fillStyle = C.dark;
  ctx.font = '900 30px Montserrat';
  ctx.fillText(courseName.toUpperCase(), W / 2, 450);

  // ───── Award Text ─────
  ctx.fillStyle = C.light;
  ctx.font = 'italic 500 16px Montserrat';
  ctx.fillText(
    'Awarded for outstanding performance and successful completion',
    W / 2,
    490
  );
  ctx.fillText(
    'of all assessments and practical projects.',
    W / 2,
    515
  );

  // ───── Date ─────
  const displayDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  ctx.fillStyle = C.dark;
  ctx.font = '700 18px Montserrat';
  ctx.textAlign = 'center';
  ctx.fillText(displayDate, 180, H - 100);

  ctx.beginPath();
  ctx.moveTo(80, H - 85);
  ctx.lineTo(280, H - 85);
  ctx.stroke();

  ctx.fillStyle = C.light;
  ctx.font = '600 12px Montserrat';
  ctx.fillText('DATE', 180, H - 60);

  // ───── Signature ─────
  ctx.fillStyle = C.dark;
  ctx.font = 'italic 700 40px Dancing Script';
  ctx.fillText('Deepak Vishwakarma', W - 220, H - 100);

  ctx.beginPath();
  ctx.moveTo(W - 340, H - 85);
  ctx.lineTo(W - 100, H - 85);
  ctx.stroke();

  ctx.font = '900 14px Montserrat';
  ctx.fillText('DEEPAK VISHWAKARMA', W - 220, H - 60);

  ctx.fillStyle = C.light;
  ctx.font = '600 12px Montserrat';
  ctx.fillText('FOUNDER & CEO, DSA MENTOR', W - 220, H - 40);

  // ───── Watermark ─────
  ctx.save();
  ctx.globalAlpha = 0.04;
  ctx.font = '900 300px Montserrat';
  ctx.fillStyle = C.dark;
  ctx.textAlign = 'center';
  ctx.fillText('DM', W / 2, H / 2 + 100);
  ctx.restore();
};

  // ───────────────── DOWNLOAD PDF ─────────────────
  const downloadCertificate = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      // 1. Issue certificate in backend
      try {
        const response = await axiosClient.post('/api/certificates/issue', {
          certId,
          userName,
          courseName
        });
        console.log("Certificate issued/verified in DB:", response.data);
      } catch (issueErr) {
        console.error("Backend issue error details:", issueErr.response?.data || issueErr.message);
        // We still let them download, but alert that verification might not work
        alert(`Verification registration failed: ${issueErr.response?.data?.message || issueErr.message}. Your certificate will download, but public verification might be unavailable.`);
      }

      // 2. Capture and download
      document.body.style.colorScheme = 'light';

      await document.fonts.ready;
      await new Promise((r) => setTimeout(r, 300));

      const W = 1123,
        H = 794;

      const canvas = document.createElement('canvas');
      canvas.width = W * 2;
      canvas.height = H * 2;

      const ctx = canvas.getContext('2d');
      ctx.scale(2, 2);

      await drawCertificate(ctx, W, H);

      const imgData = canvas.toDataURL('image/png', 1.0);

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [W, H],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, W, H, undefined, 'FAST');

      pdf.save(
        `${userName.replace(/\s+/g, '_')}_DSA_Mentor_Certificate.pdf`
      );
    } catch (err) {
      console.error(err);
      alert('Download failed: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <button
        onClick={downloadCertificate}
        disabled={isGenerating || !fontsReady}
        className="flex items-center gap-4 px-10 py-5 bg-[#1e293b] text-white rounded-2xl font-black text-xl shadow-2xl transition-all active:scale-95"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
            Generating...
          </>
        ) : !fontsReady ? 'Loading Fonts...' : (
          <>
            <Download className="w-6 h-6 animate-bounce" />
            Download Professional Certificate
          </>
        )}
      </button>

      <div className="flex gap-6 text-slate-500 text-xs font-bold">
        <span className="flex items-center gap-1">
          <ShieldCheck size={14} className="text-green-500" />
          ISO Verified
        </span>
        <span className="flex items-center gap-1">
          <Award size={14} className="text-yellow-500" />
          Official Certification
        </span>
      </div>
    </div>
  );
};

export default Certificate;