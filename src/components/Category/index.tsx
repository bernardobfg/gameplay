import React from 'react';
import {SvgProps} from 'react-native-svg';
import {
  Text,
  View
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { LinearGradient } from 'expo-linear-gradient';

type Props = RectButtonProps & {
  title: string;
  icon: React.FC<SvgProps>;
  hasCheckBox?: boolean;
  checked?: boolean;
}

export function Category({
  title,
  icon: Icon,
  checked = false,
  hasCheckBox = false,
  ...rest
}: Props) {
  const {secondary50,secondary85, secondary40, secondary70} = theme.colors
  return (
    <RectButton {...rest}>
      <LinearGradient
      style={styles.container}
      colors={[secondary50, secondary70]}
    >
        <LinearGradient
          style={[styles.content, { opacity: checked ? 1 : 0.5 }]}
          colors={[checked? secondary85:secondary40, secondary50]}
        >
          {
            hasCheckBox && (
            <View style={checked ? styles.checked : styles.check} />
          )}
          
          <Icon width={48} height={48} />
          <Text style={styles.title}>{title}</Text>

        </LinearGradient>
    </LinearGradient>
    </RectButton>
  );
}