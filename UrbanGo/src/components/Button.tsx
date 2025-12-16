import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../../config/constants';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function Button({ title, variant = 'primary', style, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'outline' && styles.outline,
        style,
      ]}
      {...props}
    >
      <Text
        style={[
          styles.text,
          variant === 'primary' && styles.primaryText,
          variant === 'secondary' && styles.secondaryText,
          variant === 'outline' && styles.outlineText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  text: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
  },
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary,
  },
});
