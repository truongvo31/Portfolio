import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Text,
  tokens,
} from '@fluentui/react-components';
import {
  CheckmarkCircle24Regular,
  DismissCircle24Regular,
  ErrorCircle24Regular,
  QuestionCircle24Regular,
} from '@fluentui/react-icons';
import useAsyncDialog from '../stores/useAsyncDialog';

export type MessageDialogProps = {
  title: string;
  message: string;
  type?: 'info' | 'warning' | 'error' | 'success' | 'confirm';
};

const MessageDialog = ({ title, message, type = 'info' }: MessageDialogProps) => {
  const { resolve, isOpen } = useAsyncDialog();

  // Color hex alone won't work, must write it explicitly since tailwind use treeshaking
  // and will not render runtime generated class names like `text-[#0078D4]` in production build.
  const titleBgColor = (() => {
    switch (type) {
      case 'info':
        return 'bg-[#0078D4]'; // brand
      case 'warning':
        return 'bg-[#FFA500]'; // warning
      case 'error':
        return 'bg-[#D13438]'; // danger
      case 'success':
        return 'bg-[#107C10]'; // success
      case 'confirm':
        return 'bg-[#0078D4]'; // brand
      default:
        return 'bg-[#0078D4]'; // brand
    }
  })();

  const icon = (() => {
    switch (type) {
      case 'info':
        return <ErrorCircle24Regular className="text-[#0078D4] mr-2 size-12" />;
      case 'warning':
        return <ErrorCircle24Regular className="text-[#FFA500] mr-2 size-12" />;
      case 'error':
        return <DismissCircle24Regular className="text-[#D13438] mr-2 size-12" />;
      case 'success':
        return <CheckmarkCircle24Regular className="text-[#107C10] mr-2 size-12" />;
      case 'confirm':
        return <QuestionCircle24Regular className="text-[#0078D4] mr-2 size-12" />;
      default:
        return <CheckmarkCircle24Regular className="text-[#0078D4] mr-2 size-12" />;
    }
  })();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(_event, data) => {
        if (!data.open) {
          void resolve(false);
        }
      }}
    >
      <DialogSurface
        style={{ zIndex: tokens.zIndexPriority }}
        className={'p-0! w-fit min-w-100'}
        mountNode={document.getElementById('root-fluent-provider') ?? undefined}
      >
        <DialogBody>
          <DialogTitle
            className={`h-(--header-height) flex items-center p-3 text-white rounded-t ${titleBgColor}`}
          >
            {title}
          </DialogTitle>
          <DialogContent className="p-3! grid grid-cols-[auto_1fr] items-center justify-center">
            {icon}
            <Text>{message}</Text>
          </DialogContent>
          <DialogActions fluid className="p-3!">
            {type === 'confirm' && (
              <Button appearance="secondary" onClick={() => void resolve(false)}>
                Cancel
              </Button>
            )}
            <Button
              appearance={type === 'confirm' ? 'primary' : 'secondary'}
              onClick={() => void resolve(true)}
            >
              OK
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default MessageDialog;
