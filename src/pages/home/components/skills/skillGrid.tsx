import { Card, CardHeader, Field, ProgressBar } from '@fluentui/react-components';
import { t } from 'i18next';

export type SkillGridProps = {
  id: string;
  name: string;
  level: number;
  icon: React.ReactElement;
};

const calcProgressBarColor = (level: number) => {
  if (level >= 100) return 'success';
  if (level >= 75) return 'brand';
  if (level >= 50) return 'warning';
  return 'error';
};

const SkillGrid = ({ skills }: { skills: SkillGridProps[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {skills.map((skill) => (
        <Card key={skill.id} orientation="horizontal" appearance="outline">
          <CardHeader
            image={skill.icon}
            header={
              <Field
                validationMessage={t(`client.home.skills.programming.levels.${skill.level}`)}
                validationState="none"
                className="w-full"
                label={skill.name}
              >
                <ProgressBar value={skill.level / 100} color={calcProgressBarColor(skill.level)} />
              </Field>
            }
            description={
              // <Caption1>{t(`client.home.skills.programming.levels.${skill.level}`)}</Caption1>
              null
            }
          />
        </Card>
      ))}
    </div>
  );
};

export default SkillGrid;
