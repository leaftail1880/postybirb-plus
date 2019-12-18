import React from 'react';
import _ from 'lodash';
import { Website, LoginDialogProps } from '../interfaces/website.interface';
import {
  SubmissionSectionProps
} from '../../views/submissions/interfaces/submission-section.interface';
import { DefaultDiscordSubmissionOptions } from '../../../../electron-app/src/websites/discord/discord.interface';
import TagInput from '../../views/submissions/form-components/TagInput';
import DescriptionInput from '../../views/submissions/form-components/DescriptionInput';
import { SubmissionPart } from '../../../../electron-app/src/submission/interfaces/submission-part.interface';
import { Alert, Form, Input, Checkbox } from 'antd';
import DiscordLogin from './DiscordLogin';
import { FileSubmission } from '../../../../electron-app/src/submission/file-submission/interfaces/file-submission.interface';
import { Submission } from '../../../../electron-app/src/submission/interfaces/submission.interface';

const defaultOptions: DefaultDiscordSubmissionOptions = {
  embed: true,
  spoiler: false,
  tags: {
    extendDefault: true,
    value: []
  },
  description: {
    overwriteDefault: false,
    value: ''
  },
  rating: null,
  useThumbnail: true
};

export class Discord implements Website {
  name: string = 'Discord';
  LoginDialog = (props: LoginDialogProps) => <DiscordLogin {...props} />;

  FileSubmissionForm = (
    props: SubmissionSectionProps<FileSubmission, DefaultDiscordSubmissionOptions>
  ) => <DiscordFileSubmissionForm key={props.part.accountId} {...props} />;

  NotificationSubmissionForm = (
    props: SubmissionSectionProps<Submission, DefaultDiscordSubmissionOptions>
  ) => <DiscordFileSubmissionForm key={props.part.accountId} {...props} />;

  getDefaults() {
    return _.cloneDeep(defaultOptions);
  }
}

export class DiscordFileSubmissionForm extends React.Component<
  SubmissionSectionProps<Submission, DefaultDiscordSubmissionOptions>
> {
  private readonly defaultOptions: DefaultDiscordSubmissionOptions = _.cloneDeep(defaultOptions);

  handleChange(fieldName: string, { target }) {
    const part: SubmissionPart<DefaultDiscordSubmissionOptions> = _.cloneDeep(this.props.part);
    part.data[fieldName] = target.value;
    this.props.onUpdate(part);
  }

  handleTagChange(update: any) {
    const part: SubmissionPart<DefaultDiscordSubmissionOptions> = _.cloneDeep(this.props.part);
    part.data.tags = update;
    this.props.onUpdate(part);
  }

  handleDescriptionChange(update) {
    const part: SubmissionPart<DefaultDiscordSubmissionOptions> = _.cloneDeep(this.props.part);
    part.data.description = update;
    this.props.onUpdate(part);
  }

  handleCheckboxChange(fieldName: string, { target }) {
    const part: SubmissionPart<DefaultDiscordSubmissionOptions> = _.cloneDeep(this.props.part);
    part.data[fieldName] = target.checked;
    this.props.onUpdate(part);
  }

  render() {
    const { data } = this.props.part;
    return (
      <div>
        {this.props.problems.length ? (
          <Alert
            type="error"
            message={
              <ul>
                {this.props.problems.map(problem => (
                  <li>{problem}</li>
                ))}
              </ul>
            }
          />
        ) : null}
        <div>
          <Form.Item label="Title">
            <Input
              placeholder="Using default"
              value={data.title}
              onChange={this.handleChange.bind(this, 'title')}
            />
          </Form.Item>
          <TagInput
            onChange={this.handleTagChange.bind(this)}
            defaultValue={data.tags}
            defaultTags={this.props.defaultData!.tags}
            label="Tags"
          />
          <DescriptionInput
            defaultValue={data.description}
            onChange={this.handleDescriptionChange.bind(this)}
            label="Description"
          />
          <Form.Item>
            <div className="flex">
              <div className="w-full">
                <div>
                  <Checkbox
                    checked={data.embed}
                    onChange={this.handleCheckboxChange.bind(this, 'embed')}
                  >
                    Embed description
                  </Checkbox>
                </div>
                <div>
                  <Checkbox
                    checked={data.spoiler}
                    onChange={this.handleCheckboxChange.bind(this, 'spoiler')}
                  >
                    Spoiler
                  </Checkbox>
                </div>
              </div>
            </div>
          </Form.Item>
        </div>
      </div>
    );
  }
}