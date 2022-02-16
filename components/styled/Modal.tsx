import { FunctionComponent, ReactNode, useState } from "react";
import { Modal as DefaultModal, View, StyleSheet } from "react-native";
import { PressableText } from "./PressableText";

interface IModalProps {
  animation?: "slide" | "fade";
  activator?: FunctionComponent<{ handleOpen: () => void }>;
  children: FunctionComponent<{
    handleOpen: () => void;
    handleClose: () => void;
  }>;
}

export function Modal({
  activator: Activator,
  children,
  animation = "slide",
}: IModalProps) {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const handleOpen = () => setModalVisible(true);
  const handleClose = () => setModalVisible(false);

  return (
    <>
      <DefaultModal visible={isModalVisible} animationType={animation}>
        <View style={styles.centerView}>
          {children({ handleOpen, handleClose })}
          <View style={styles.contentView}>{children}</View>
          <PressableText onPress={handleClose} text="Close" />
        </View>
      </DefaultModal>

      {Activator ? (
        <Activator handleOpen={handleOpen} />
      ) : (
        <PressableText onPress={handleOpen} text="Open" />
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
