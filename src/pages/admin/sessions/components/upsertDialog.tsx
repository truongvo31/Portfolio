import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Field,
  Input,
  Select,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { utcToLocalTime } from '../../../../helpers/dateTimeHelper';
import useApi from '../../../../stores/useApi';
import useAsyncDialog from '../../../../stores/useAsyncDialog';
import useLoading from '../../../../stores/useLoading';
import useToaster from '../../../../stores/useToaster';
import type { Session } from '../types';

type UpsertDialogProps = {
  model?: Session;
};

const useStyles = makeStyles({
  dialogSurface: {
    zIndex: tokens.zIndexPopup,
    width: 'fit-content',
    padding: '0',
  },
});

const UpsertDialog = ({ model }: UpsertDialogProps) => {
  const { t } = useTranslation();
  const { resolve, isOpen } = useAsyncDialog();
  const { $error } = useToaster();
  const { $post, $patch } = useApi();
  const { setLoading } = useLoading();
  const styles = useStyles();

  const [timespan, setTimespan] = useState(1);
  const [spanUnit, setSpanUnit] = useState<'hours' | 'days'>('hours');
  const [description, setDescription] = useState(model?.description ?? '');
  const [isRevoked, setIsRevoked] = useState(model?.isRevoked ?? false);

  const title = model
    ? t('admin.page.sessions.dialog.title.edit')
    : t('admin.page.sessions.dialog.title.create');

  const isEdit = Boolean(model);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (timespan <= 0) {
      $error(
        t('admin.page.sessions.messages.invalidInputTitle'),
        t('admin.page.sessions.messages.invalidInputBody'),
      );
      return;
    }
    try {
      setLoading(true);
      if (!isEdit) {
        const payload = {
          timeSpan: timespan,
          timeSpanUnit: spanUnit,
          description,
        };
        const { error, message } = await $post('admin/create-session', payload);
        if (error) throw new Error(message || t('admin.page.sessions.messages.submitErrorBody'));
      } else {
        const payload = {
          isRevoked,
          description,
        };
        const { error, message } = await $patch(`admin/update-session/${model?.id}`, payload);
        if (error) throw new Error(message || t('admin.page.sessions.messages.submitErrorBody'));
      }
      void resolve(true);
    } catch (error) {
      $error(
        t('admin.page.sessions.messages.submitErrorTitle'),
        error instanceof Error ? error.message : t('admin.page.sessions.messages.submitErrorBody'),
      );
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
        className={styles.dialogSurface}
        mountNode={document.getElementById('root-fluent-provider') ?? undefined}
      >
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <DialogTitle className={`h-(--header-height) flex items-center p-3 rounded-t`}>
              {title}
            </DialogTitle>
            <DialogContent className="p-3! grid grid-cols-1 md:grid-cols-4 gap-2 items-center justify-center">
              {isEdit ? (
                <>
                  <Field
                    className="col-span-full"
                    label={t('admin.page.sessions.dialog.labels.id')}
                  >
                    <Input value={model?.id ?? ''} readOnly />
                  </Field>
                  <Field
                    className="col-span-2"
                    label={t('admin.page.sessions.dialog.labels.createdAt')}
                  >
                    <Input value={utcToLocalTime(model?.createdAtUtc ?? '')} readOnly />
                  </Field>
                  <Field
                    className="col-span-2"
                    label={t('admin.page.sessions.dialog.labels.expiresAt')}
                  >
                    <Input value={utcToLocalTime(model?.expiresAtUtc ?? '')} readOnly />
                  </Field>
                  <Checkbox
                    className="col-span-2"
                    checked={isRevoked}
                    label={t('admin.page.sessions.dialog.labels.revoked')}
                    onChange={(e) => setIsRevoked(e.target.checked)}
                  />
                  <Field
                    className="col-span-2"
                    label={t('admin.page.sessions.dialog.labels.revokedAt')}
                  >
                    <Input value={utcToLocalTime(model?.revokedAtUtc ?? '')} readOnly />
                  </Field>
                </>
              ) : (
                <>
                  <Field
                    className="col-span-2"
                    label={t('admin.page.sessions.dialog.labels.span')}
                    required
                  >
                    <Input
                      type="number"
                      placeholder={t('admin.page.sessions.dialog.placeholders.span')}
                      value={String(timespan ?? '')}
                      onChange={(e) => setTimespan(Number(e.target.value))}
                    />
                  </Field>
                  <Field
                    className="col-span-2"
                    label={t('admin.page.sessions.dialog.labels.spanUnit')}
                  >
                    <Select
                      value={spanUnit}
                      onChange={(e) => setSpanUnit(e.target.value as 'hours' | 'days')}
                    >
                      <option value="hours">{t('admin.page.sessions.dialog.units.hours')}</option>
                      <option value="days">{t('admin.page.sessions.dialog.units.days')}</option>
                    </Select>
                  </Field>
                </>
              )}
              <Field
                className="col-span-full"
                label={t('admin.page.sessions.dialog.labels.description')}
              >
                <Input
                  type="text"
                  placeholder={t('admin.page.sessions.dialog.placeholders.description')}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Field>
            </DialogContent>
            <DialogActions fluid className="p-3!">
              <Button appearance="primary" type="submit">
                {t('admin.page.sessions.dialog.buttons.submit')}
              </Button>
              <Button appearance="secondary" onClick={() => void resolve(false)}>
                {t('admin.page.sessions.dialog.buttons.cancel')}
              </Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
};

export default UpsertDialog;
