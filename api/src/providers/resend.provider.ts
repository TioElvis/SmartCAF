import { Resend } from 'resend';
import { join } from 'node:path';
import Handlebars from 'handlebars';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync, readFileSync } from 'node:fs';
import { TEMPLATES_ROOT } from 'src/lib/constants';

@Injectable()
export class ResendProvider {
  private resend: Resend;

  constructor(private _ConfigService_: ConfigService) {
    this.resend = new Resend(
      this._ConfigService_.get<string>('RESEND_API_KEY'),
    );
  }

  private CompileTemplate(name: string, context: Record<string, any>) {
    const path = join(TEMPLATES_ROOT, `${name}.hbs`);

    if (existsSync(path) === false) {
      throw new Error(`Template not found: ${name}.hbs`);
    }

    const source = readFileSync(path, 'utf8');
    const compiled = Handlebars.compile(source);

    return compiled(context);
  }
}
