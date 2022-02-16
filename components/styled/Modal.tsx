import { FunctionComponent, ReactNode, useState } from "react";
import { Modal as DefaultModal, View, StyleSheet } from "react-native";
import { PressableText } from "./PressableText";

interface IModalProps {
  animation?: "slide" | "fade";
  activator?: FunctionComponent<{ handleOpen: () => void }>;
  children: ReactNode;
}

export function Modal({
  activator: Activator,
  children,
  animation = "slide",
}: IModalProps) {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <DefaultModal visible={isModalVisible} animationType={animation}>
        <View style={styles.centerView}>
          <View style={styles.contentView}>{children}</View>
          <PressableText onPress={() => setModalVisible(false)} text="Close" />
        </View>
      </DefaultModal>

      {Activator ? (
        <Activator handleOpen={() => setModalVisible(true)} />
      ) : (
        <PressableText onPress={() => setModalVisible(true)} text="Open" />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentView: {
    marginBottom: 20,
  },
});
