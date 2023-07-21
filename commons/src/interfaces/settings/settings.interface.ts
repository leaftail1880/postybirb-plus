export interface Settings {
  advertise: boolean;
  emptyQueueOnFailedPost: boolean;
  postRetries: number;
  openOnLogin: boolean;
  closeOnQuit: boolean;
  openWindowOnStartup: boolean;
  useHardwareAcceleration: boolean;
  maxPNGSizeCompression: number;
  maxPNGSizeCompressionWithAlpha: number;
  maxJPEGQualityCompression: number;
  maxJPEGSizeCompression: number;
  silentNotification: boolean;
}
