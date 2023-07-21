import { Checkbox, Form, Select } from 'antd';
import _ from 'lodash';
import {
  FileSubmission,
  Folder,
  Submission,
  VKontakteFileOptions,
  VKontakteNotificationOptions
} from 'postybirb-commons';
import React from 'react';
import WebsiteService from '../../services/website.service';
import { SubmissionSectionProps } from '../../views/submissions/submission-forms/interfaces/submission-section.interface';
import { WebsiteSectionProps } from '../form-sections/website-form-section.interface';
import GenericFileSubmissionSection from '../generic/GenericFileSubmissionSection';
import { GenericSelectProps } from '../generic/GenericSelectProps';
import GenericSubmissionSection from '../generic/GenericSubmissionSection';
import { LoginDialogProps } from '../interfaces/website.interface';
import { WebsiteImpl } from '../website.base';
import VKontakteLogin from './VKontakteLogin';

export class VKontakte extends WebsiteImpl {
  internalName: string = 'VKontakte';
  name: string = 'VKontakte';
  supportsAdditionalFiles: boolean = true;
  supportsTags: boolean = false;
  loginUrl: string = '';

  LoginDialog = (props: LoginDialogProps) => <VKontakteLogin {...props} />;

  FileSubmissionForm = (props: WebsiteSectionProps<FileSubmission, VKontakteFileOptions>) => (
    <VKontakteFileSubmissionForm
      key={props.part.accountId}
      {...props}
      ratingOptions={{
        show: false
      }}
      tagOptions={{ show: false }}
      hideTitle={true}
      hideThumbnailOptions={true}
    />
  );

  NotificationSubmissionForm = (
    props: WebsiteSectionProps<Submission, VKontakteNotificationOptions>
  ) => (
    <VKontakteNotificationSubmissionForm
      key={props.part.accountId}
      {...props}
      hideTitle={true}
      ratingOptions={{
        show: false
      }}
      tagOptions={{ show: false }}
    />
  );
}

interface VKontakteSubmissionState {
  walls: Folder[];
}

class VKontakteNotificationSubmissionForm extends GenericSubmissionSection<VKontakteNotificationOptions> {
  state: VKontakteSubmissionState = {
    walls: []
  };

  constructor(props: SubmissionSectionProps<FileSubmission, VKontakteNotificationOptions>) {
    super(props);
    this.state = {
      walls: []
    };

    WebsiteService.getAccountFolders(this.props.part.website, this.props.part.accountId).then(
      ({ data }) => {
        if (data) {
          if (!_.isEqual(this.state.walls, data)) {
            this.setState({ walls: data });
          }
        }
      }
    );
  }

  renderLeftForm(data: VKontakteNotificationOptions) {
    const elements = super.renderLeftForm(data);
    elements.push(
      <div>
        <Checkbox checked={data.silent} onChange={this.handleCheckedChange.bind(this, 'silent')}>
          Silent Notification
        </Checkbox>
      </div>
    );
    return elements;
  }

  renderRightForm(data: VKontakteNotificationOptions) {
    const elements = super.renderRightForm(data);
    elements.push(
      <Form.Item label="Walls">
        <Select
          {...GenericSelectProps}
          mode="multiple"
          className="w-full"
          value={data.walls}
          onChange={this.setValue.bind(this, 'walls')}
          allowClear={true}
        >
          {this.state.walls.map(folder => {
            if (folder.children && folder.children.length) {
              return (
                <Select.OptGroup label={folder.label}>
                  {folder.children.map(subfolder => (
                    <Select.Option value={subfolder.value}>{subfolder.label}</Select.Option>
                  ))}
                </Select.OptGroup>
              );
            } else {
              return <Select.Option value={folder.value}>{folder.label}</Select.Option>;
            }
          })}
        </Select>
      </Form.Item>
    );
    return elements;
  }
}

export class VKontakteFileSubmissionForm extends GenericFileSubmissionSection<VKontakteFileOptions> {
  state: VKontakteSubmissionState = {
    walls: []
  };

  constructor(props: SubmissionSectionProps<FileSubmission, VKontakteFileOptions>) {
    super(props);
    this.state = {
      walls: []
    };

    WebsiteService.getAccountFolders(this.props.part.website, this.props.part.accountId).then(
      ({ data }) => {
        if (data) {
          if (!_.isEqual(this.state.walls, data)) {
            this.setState({ walls: data });
          }
        }
      }
    );
  }

  renderLeftForm(data: VKontakteFileOptions) {
    const elements = super.renderLeftForm(data);
    elements.push(
      <div>
        <Checkbox checked={data.silent} onChange={this.handleCheckedChange.bind(this, 'silent')}>
          Silent Notification
        </Checkbox>
      </div>
    );
    return elements;
  }

  renderRightForm(data: VKontakteFileOptions) {
    const elements = super.renderRightForm(data);
    elements.push(
      <Form.Item label="Walls">
        <Select
          {...GenericSelectProps}
          mode="multiple"
          className="w-full"
          value={data.walls}
          onChange={this.setValue.bind(this, 'walls')}
          allowClear={true}
        >
          {this.state.walls.map(folder => {
            if (folder.children && folder.children.length) {
              return (
                <Select.OptGroup label={folder.label}>
                  {folder.children.map(subfolder => (
                    <Select.Option value={subfolder.value}>{subfolder.label}</Select.Option>
                  ))}
                </Select.OptGroup>
              );
            } else {
              return <Select.Option value={folder.value}>{folder.label}</Select.Option>;
            }
          })}
        </Select>
      </Form.Item>
    );
    return elements;
  }
}
