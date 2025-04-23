import * as React from 'react';
import { View } from 'react-native';

type RenderWhenProps = React.PropsWithChildren<{
  condition?: boolean;
}>;

function RenderWhen({ condition = false, children = <View /> }: RenderWhenProps) {
  // Used to render react elements when the condition is true. One purpose of this is also to eliminate ternary operator to make the code clean and easy to read.
  return condition ? children : null;
}

export default RenderWhen;
