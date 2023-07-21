import { Expose } from 'class-transformer';
import { IsArray, IsBoolean } from 'class-validator';
import { DefaultFileOptions } from '../../interfaces/submission/default-options.interface';
import { VKontakteFileOptions } from '../../interfaces/websites/vkontakte/vkontakte.file.options.interface';
import { DefaultValue } from '../../models/decorators/default-value.decorator';
import { DefaultFileOptionsEntity } from '../../models/default-file-options.entity';

export class VKontakteFileOptionsEntity
  extends DefaultFileOptionsEntity
  implements VKontakteFileOptions
{
  @Expose()
  @IsBoolean()
  @DefaultValue(false)
  silent!: boolean;

  @Expose()
  @IsArray()
  @DefaultValue([])
  walls!: string[];

  constructor(entity?: Partial<VKontakteFileOptions>) {
    super(entity as DefaultFileOptions);
  }
}
