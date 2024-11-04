
import { Component, OnInit } from '@angular/core';
import { WorldbankService } from '../../worldbank.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-world',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './world.component.html',
  styleUrl: './world.component.css'
})
export class WorldComponent implements OnInit {

  constructor(private apiService: WorldbankService) {
  }

  ngOnInit(): void {
  }

  onMouseOver(event: MouseEvent) {
    const path = (event.target) as SVGPathElement;
    const countryId = path.id;
    if (event.target instanceof SVGPathElement) {
      this.apiService.getCountryData(countryId).subscribe(data => {
        const countryData = data[1][0];
        const name = document.getElementById('name');
        name!.innerHTML = countryData.name;
        const capital = document.getElementById('capital');
        capital!.innerHTML = countryData.capitalCity;
        const region = document.getElementById('region');
        region!.innerHTML = countryData.region.value;
        const income = document.getElementById('income');
        income!.innerHTML = countryData.incomeLevel.value;
        const latitude = document.getElementById('latitude');
        latitude!.innerHTML = countryData.latitude;
        const longitude = document.getElementById('longitude');
        longitude!.innerHTML = countryData.longitude;
      });
      if (path) {
        path.style.fill = 'yellow';
      }
    }
  };

  onMouseOut(event: MouseEvent) {
    if (event.target instanceof SVGPathElement) {
      const path = (event.target) as SVGPathElement;
      if (path) {
        path.style.fill = '';
      }
      const name = document.getElementById('name');
      name!.innerHTML = '';
      const capital = document.getElementById('capital');
      capital!.innerHTML = '';
      const region = document.getElementById('region');
      region!.innerHTML = '';
      const income = document.getElementById('income');
      income!.innerHTML = '';
      const latitude = document.getElementById('latitude');
      latitude!.innerHTML = '';
      const longitude = document.getElementById('longitude');
      longitude!.innerHTML = '';
    }
  };


  async onSubmit(countryId: string) {
    const url = `https://api.worldbank.org/V2/country/${countryId}?format=json`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      const dataPath = data[1][0];
      const countryName = dataPath.name;
      const countryCapital = dataPath.capitalCity;
      const countryRegion = dataPath.region.value;
      const countryIncome = dataPath.incomeLevel.value;
      const countryLong = dataPath.longitude;
      const countryLat = dataPath.latitude;

      const nameElement = document.getElementById('name') as HTMLElement;
      const capitalElement = document.getElementById('capital') as HTMLElement;
      const regionElement = document.getElementById('region') as HTMLElement;
      const incomeElement = document.getElementById('income') as HTMLElement;
      const longElement = document.getElementById('longitude') as HTMLElement;
      const latElement = document.getElementById('latitude') as HTMLElement;

      if (nameElement) nameElement.innerText = countryName;
      if (capitalElement) capitalElement.innerText = countryCapital;
      if (regionElement) regionElement.innerText = countryRegion;
      if (incomeElement) incomeElement.innerText = countryIncome;
      if (longElement) longElement.innerText = countryLong;
      if (latElement) latElement.innerText = countryLat;

    } catch (error) {
      console.error('Error fetching country data:', error);
    }


  }


}
