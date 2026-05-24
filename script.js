const SITE_CONFIG = {
  rsvpFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdLqFzW78R-9dRw6UyBX8Jk5SaAxfoMwoZPPd5JB3evD8O3zQ/viewform',
  eventTitle: '周陳府喜宴',
  eventStart: '2026-06-27T12:00:00+08:00',
  eventEnd: '2026-06-27T14:30:00+08:00',
  venueName: '一葉日本料理',
  address: '嘉義市西區西平里博愛路二段700號',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=%E4%B8%80%E8%91%89%E6%97%A5%E6%9C%AC%E6%96%99%E7%90%86%20%E5%98%89%E7%BE%A9%E5%B8%82%E8%A5%BF%E5%8D%80%E8%A5%BF%E5%B9%B3%E9%87%8C%E5%8D%9A%E6%84%9B%E8%B7%AF%E4%BA%8C%E6%AE%B5700%E8%99%9F',
  parkingAddress: '嘉義市西區友忠路52號',
  parkingMapUrl: 'https://www.google.com/maps/search/?api=1&query=%E5%98%89%E7%BE%A9%E5%B8%82%E8%A5%BF%E5%8D%80%E5%8F%8B%E5%BF%A0%E8%B7%AF52%E8%99%9F'
};

function formatCountdown(target) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return '喜宴今日登場';

  const dayMs = 24 * 60 * 60 * 1000;
  const hourMs = 60 * 60 * 1000;
  const days = Math.floor(diff / dayMs);
  const hours = Math.floor((diff % dayMs) / hourMs);
  return `${days}天 ${hours}小時`;
}

function toIcsDate(date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function downloadCalendarFile() {
  const start = new Date(SITE_CONFIG.eventStart);
  const end = new Date(SITE_CONFIG.eventEnd);
  const description = '周弘明與陳淑玲喜宴，敬邀在上帝祝福與親友見證中一同蒞臨。';
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding RSVP//GitHub Pages//ZH',
    'BEGIN:VEVENT',
    `UID:wedding-rsvp-20260627-${Date.now()}@github-pages`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${SITE_CONFIG.eventTitle}`,
    `LOCATION:${SITE_CONFIG.venueName}，${SITE_CONFIG.address}`,
    `DESCRIPTION:${description}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = '周陳府喜宴.ics';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function setupLinks() {
  document.querySelectorAll('[data-map-link]').forEach((link) => {
    link.href = SITE_CONFIG.mapUrl;
  });

  document.querySelectorAll('[data-rsvp-external]').forEach((link) => {
    link.href = SITE_CONFIG.rsvpFormUrl;
    link.target = '_blank';
    link.rel = 'noreferrer';
  });

  document.querySelectorAll('[data-parking-map-link]').forEach((link) => {
    link.href = SITE_CONFIG.parkingMapUrl;
  });
}

function setupCountdown() {
  const countdown = document.querySelector('[data-countdown]');
  if (!countdown) return;

  const target = new Date(SITE_CONFIG.eventStart);
  const renderCountdown = () => {
    if (Number.isNaN(target.getTime())) {
      countdown.textContent = '2026.06.27';
      return;
    }

    countdown.textContent = formatCountdown(target);
  };

  renderCountdown();
  window.setInterval(renderCountdown, 60 * 1000);
}

function setupAddressCopy() {
  const button = document.querySelector('[data-copy-address]');
  const status = document.querySelector('[data-copy-status]');
  if (!button || !status) return;

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.address);
      status.textContent = '已複製';
      window.setTimeout(() => {
        status.textContent = '';
      }, 2200);
    } catch (error) {
      status.textContent = SITE_CONFIG.address;
    }
  });
}

function setupCalendar() {
  const button = document.querySelector('[data-calendar-button]');
  if (!button) return;

  button.addEventListener('click', downloadCalendarFile);
}

function setupEasterEgg() {
  const trigger = document.querySelector('[data-easter-egg]');
  const modal = document.querySelector('[data-easter-egg-modal]');
  const closeButton = document.querySelector('[data-easter-egg-close]');
  const video = modal?.querySelector('video');
  if (!trigger || !modal || !closeButton) return;

  const openModal = () => {
    modal.hidden = false;
    closeButton.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    if (video) video.pause();
    trigger.focus();
  };

  trigger.addEventListener('click', openModal);
  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });
}

function setupMobileFormFrame() {
  const shell = document.querySelector('.form-shell');
  if (!shell) return;

  const virtualWidth = 480;
  const virtualHeight = 1800;

  const resizeFrame = () => {
    const isMobile = window.matchMedia('(max-width: 520px)').matches;
    if (!isMobile) {
      shell.style.removeProperty('--form-frame-scale');
      shell.style.removeProperty('--form-frame-width');
      shell.style.removeProperty('--form-frame-height');
      shell.style.removeProperty('--form-visual-height');
      return;
    }

    const scale = Math.min(1, shell.clientWidth / virtualWidth);
    shell.style.setProperty('--form-frame-scale', scale.toFixed(4));
    shell.style.setProperty('--form-frame-width', `${virtualWidth}px`);
    shell.style.setProperty('--form-frame-height', `${virtualHeight}px`);
    shell.style.setProperty('--form-visual-height', `${Math.ceil(virtualHeight * scale)}px`);
  };

  resizeFrame();
  window.addEventListener('resize', resizeFrame);
}

function setupHashScrollCorrection() {
  if (!window.location.hash) return;

  window.setTimeout(() => {
    const target = document.querySelector(window.location.hash);
    if (target) target.scrollIntoView({ block: 'start' });
  }, 350);
}

document.addEventListener('DOMContentLoaded', () => {
  setupLinks();
  setupCountdown();
  setupAddressCopy();
  setupCalendar();
  setupEasterEgg();
  setupMobileFormFrame();
  setupHashScrollCorrection();
});
