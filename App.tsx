import React, { useEffect } from 'react';

const App: React.FC = () => {
  useEffect(() => {
    const sendDingTalkNotification = async () => {
      const webhook = '/api/notify';

      let clientInfo: {
        ip: string;
        city: string;
        region: string;
        country: string;
        org: string;
      } = {
        ip: 'Unknown',
        city: 'Unknown',
        region: 'Unknown',
        country: 'Unknown',
        org: 'Unknown',
      };

      try {
        const res = await fetch('https://ipapi.co/json/');
        if (res.ok) {
          const data = await res.json();
          clientInfo = {
            ip: data.ip || 'Unknown',
            city: data.city || 'Unknown',
            region: data.region || 'Unknown',
            country: data.country_name || 'Unknown',
            org: data.org || 'Unknown',
          };
        }
      } catch (error) {
        console.warn('Failed to fetch IP details', error);
      }

      const message = [
        `🔔 [新访问] Serendipity-2025`,
        `--------------------------------`,
        `👤 IP信息`,
        `IP: ${clientInfo.ip}`,
        `位置: ${clientInfo.city}, ${clientInfo.region}, ${clientInfo.country}`,
        `ISP: ${clientInfo.org}`,
        `--------------------------------`,
        `💻 设备信息`,
        `平台: ${navigator.platform}`,
        `浏览器: ${navigator.userAgent}`,
        `语言: ${navigator.language}`,
        `屏幕: ${window.screen.width}x${window.screen.height}`,
        `--------------------------------`,
        `🔗 访问来源`,
        `URL: ${window.location.href}`,
        `Referrer: ${document.referrer || '直接访问'}`,
        `时间: ${new Date().toLocaleString()}`,
      ].join('\n');

      try {
        await fetch(webhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            msgtype: 'text',
            text: {
              content: message,
            },
          }),
        });
      } catch (error) {
        console.warn('Notification skipped:', error);
      }
    };

    sendDingTalkNotification();
  }, []);

  return (
    <main className="relative min-h-screen w-screen overflow-hidden bg-[#e2d2bb] text-[#1d1c19] selection:bg-[#1d1c19] selection:text-[#f5ead8]">
      <style>
        {`
          @keyframes paper-drift {
            0% { transform: translate3d(0, 0, 0) scale(1); }
            50% { transform: translate3d(-1.2%, 0.8%, 0) scale(1.025); }
            100% { transform: translate3d(0, 0, 0) scale(1); }
          }

          @keyframes quiet-enter {
            from { opacity: 0; transform: translateY(18px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .paper-drift {
            animation: paper-drift 18s ease-in-out infinite;
          }

          .quiet-enter {
            animation: quiet-enter 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }
        `}
      </style>
      <div className="paper-drift absolute -inset-8 bg-[radial-gradient(circle_at_20%_18%,rgba(255,248,232,0.58),transparent_30%),radial-gradient(circle_at_78%_74%,rgba(192,128,78,0.16),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.28),transparent_44%),linear-gradient(rgba(73,48,29,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(73,48,29,0.035)_1px,transparent_1px)] bg-[size:auto,auto,auto,36px_36px,36px_36px]" />
      <section className="relative mx-auto flex min-h-screen max-w-6xl items-center px-7 py-8 sm:px-12 sm:py-12 lg:px-16">
        <div className="quiet-enter max-w-5xl">
          <p className="mb-8 text-xs font-normal uppercase tracking-[0.36em] text-[#6f6a5f]">
            Serendipity / 2025
          </p>
          <h1 className="text-[clamp(3rem,8.5vw,7.25rem)] font-normal leading-[0.95] tracking-[0.03em] text-[#171612]">
            故事
            <span className="block pl-[0.48em] text-[#4d4941]">已丢失</span>
          </h1>
          <p className="mt-8 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(0.82rem,1.8vw,1.22rem)] font-light italic leading-8 tracking-[0.07em] text-[#5b4c3e]">
            “Tu deviens responsable pour toujours de ce que tu as apprivoisé.”
          </p>
        </div>
      </section>
    </main>
  );
};

export default App;
