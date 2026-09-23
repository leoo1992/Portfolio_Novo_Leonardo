import { Controller, Get, Header } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @Header('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=1800')
  async getProjects() {
    return this.projectsService.getPortfolio();
  }

  @Get('health')
  health() {
    return { status: 'ok', service: 'portfolio-api' };
  }
}
