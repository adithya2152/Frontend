export const exportBadgesAsImage = async (badges: any[]) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const badgeSize = 120;
  const padding = 20;
  const cols = Math.ceil(Math.sqrt(badges.length));
  const rows = Math.ceil(badges.length / cols);

  canvas.width = cols * (badgeSize + padding) + padding;
  canvas.height = rows * (badgeSize + padding) + padding + 80;

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#1f2937';
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Badge Collection', canvas.width / 2, 40);

  const drawRoundedRect = (x: number, y: number, width: number, height: number, radius: number) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const createGradient = (x: number, y: number, width: number, height: number, startColor: string, endColor?: string) => {
    const gradient = ctx.createLinearGradient(x, y, x + width, y + height);
    gradient.addColorStop(0, startColor);
    gradient.addColorStop(1, endColor || startColor);
    return gradient;
  };

  const drawIcon = (x: number, y: number, size: number, iconName: string, color: string) => {
    ctx.fillStyle = color;
    ctx.font = `${size}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    const iconMap: Record<string, string> = {
      'Star': '★',
      'Heart': '♥',
      'Check': '✓',
      'MessageSquare': '💬',
      'Shield': '🛡',
      'Award': '🏆',
      'Trophy': '🏆',
      'Target': '🎯',
      'Zap': '⚡',
      'Crown': '👑',
      'Gem': '💎',
      'Flag': '🚩',
      'Rocket': '🚀',
      'Fire': '🔥'
    };
    const symbol = iconMap[iconName] || '★';
    ctx.fillText(symbol, x, y);
  };

  badges.forEach((badge, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = col * (badgeSize + padding) + padding;
    const y = row * (badgeSize + padding) + padding + 60;
    ctx.save();
    if (badge.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(x + badgeSize/2, y + badgeSize/2, badgeSize/2, 0, 2 * Math.PI);
    } else if (badge.shape === 'square') {
      ctx.fillRect(x, y, badgeSize, badgeSize);
    } else {
      drawRoundedRect(x, y, badgeSize, badgeSize, 12);
    }
    if (badge.gradientEnd) {
      ctx.fillStyle = createGradient(x, y, badgeSize, badgeSize, badge.backgroundColor, badge.gradientEnd);
    } else {
      ctx.fillStyle = badge.backgroundColor;
    }
    ctx.fill();
    if (badge.glowIntensity !== 'none') {
      const glowSize = badge.glowIntensity === 'low' ? 5 : badge.glowIntensity === 'medium' ? 10 : 15;
      ctx.shadowColor = badge.backgroundColor;
      ctx.shadowBlur = glowSize;
      ctx.fill();
    }
    ctx.restore();
    drawIcon(x + badgeSize/2, y + badgeSize/2 - 10, 24, badge.icon, badge.iconColor);
    ctx.fillStyle = badge.textColor;
    ctx.font = 'bold 12px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(badge.name, x + badgeSize/2, y + badgeSize/2 + 20);
  });

  return new Promise<void>((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return resolve();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'badge-collection.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      resolve();
    }, 'image/jpeg', 0.9);
  });
}; 