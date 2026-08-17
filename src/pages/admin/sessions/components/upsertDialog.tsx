import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Field,
  Input,
  Select,
  tokens,
} from '@fluentui/react-components';
import { useState } from 'react';
import useApi from '../../../../stores/useApi';
import useAsyncDialog from '../../../../stores/useAsyncDialog';
import useLoading from '../../../../stores/useLoading';
import useMessages from '../../../../stores/useMessages';
import type { Session } from '../types';

type UpsertDialogProps = {
  model?: Session;
};

const UpsertDialog = ({ model }: UpsertDialogProps) => {
  const { resolve, isOpen } = useAsyncDialog();
  const { $error } = useMessages();
  const { $post } = useApi();
  const { setLoading } = useLoading();

  const [timespan, setTimespan] = useState(1);
  const [spanUnit, setSpanUnit] = useState<'hours' | 'days'>('hours');

  const title = model ? 'Edit Session' : 'Create Session';

  const isEdit = Boolean(model);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (timespan <= 0) {
      $error('Invalid input', 'Timespan must be greater than 0');
      return;
    }
    try {
      setLoading(true);
      const payload = {
        timespan,
        spanUnit,
      };
      const { error, message } = await $post('admin/create-session', payload);
      if (error) throw new Error(message || 'Failed to submit session');
      void resolve(true);
    } catch (error) {
      $error('Submit error', error instanceof Error ? error.message : 'Failed to submit session');
    } finally {
      setLoading(false);
    }
  };

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
        style={{ zIndex: tokens.zIndexPopup }}
        className={'p-0! w-fit min-w-100'}
        mountNode={document.getElementById('root-fluent-provider') ?? undefined}
      >
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <DialogTitle className={`h-(--header-height) flex items-center p-3 rounded-t`}>
              {title}
            </DialogTitle>
            <DialogContent className="p-3! grid grid-cols-1 md:grid-cols-3 gap-2 items-center justify-center">
              {isEdit ? (
                <Field className="col-span-full" label="Session ID">
                  <Input value={model?.id ?? ''} readOnly />
                </Field>
              ) : (
                <>
                  <Field className="col-span-2" label="Session Span" required>
                    <Input
                      type="number"
                      placeholder="Enter span"
                      value={String(timespan ?? '')}
                      onChange={(e) => setTimespan(Number(e.target.value))}
                    />
                  </Field>
                  <Field label="Span Unit">
                    <Select
                      value={spanUnit}
                      onChange={(e) => setSpanUnit(e.target.value as 'hours' | 'days')}
                    >
                      <option value="hours">Hour</option>
                      <option value="days">Day</option>
                    </Select>
                  </Field>
                </>
              )}
              <Field className="col-span-full" label="Session Description">
                <Input type="text" placeholder="Enter description" />
              </Field>
            </DialogContent>
            <DialogActions fluid className="p-3!">
              <Button appearance="primary" type="submit">
                OK
              </Button>
              <Button appearance="secondary" onClick={() => void resolve(false)}>
                Cancel
              </Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
};

export default UpsertDialog;
