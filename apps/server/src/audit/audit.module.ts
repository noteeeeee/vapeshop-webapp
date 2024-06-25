import {Global, Module} from '@nestjs/common';
import {AuditService} from "./audit.service";
import {AuditController} from "./audit.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuditEntity} from "./audit.entity";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AuditEntity])],
  providers: [AuditService],
  controllers: [AuditController],
  exports: [AuditService],
})
export class AuditModule {}
