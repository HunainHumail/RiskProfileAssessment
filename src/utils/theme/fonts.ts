type FontWeight = 'Light' | 'Regular' | 'Medium' | 'SemiBold' | 'Bold' | 'ExtraBold' | 'Thin';

const fonts: Record<'type', Record<FontWeight, string>> & {
  size: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    heading: number;
  };
} = {
  type: {
    Light: 'Sora-Light',
    Regular: 'Sora-Regular',
    Medium: 'Sora-Medium',
    SemiBold: 'Sora-SemiBold',
    Bold: 'Sora-Bold',
    ExtraBold: 'Sora-ExtraBold',
    Thin: 'Sora-Thin',
  },
  size: {
    xs: 10,      // extra small
    sm: 12,      // small
    md: 14,      // medium (default paragraph)
    lg: 16,      // large (labels, inputs)
    xl: 20,      // extra large (subheadings)
    xxl: 24,     // 2x extra large (section headings)
    heading: 32, // main app title / hero
  },
};

export default fonts;
