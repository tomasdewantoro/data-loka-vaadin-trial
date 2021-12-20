
package com.example.application.data.generator;
import java.util.ArrayList;
import java.util.List;

import com.example.application.data.entity.Movie;
import com.example.application.data.service.MovieRepository;
import com.vaadin.flow.spring.annotation.SpringComponent;

import org.neo4j.driver.*;
import org.neo4j.driver.Record;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;

@SpringComponent
@SpringBootApplication
@EnableNeo4jRepositories
public class MovieGenerator {
	@Bean
	public CommandLineRunner demo(MovieRepository movieRepository) {
		Driver driver = GraphDatabase.driver("bolt://3.237.173.92:7687", AuthTokens.basic("neo4j","sister-combustion-addresses"));
		return args -> {
			List<Movie> movies = new ArrayList<>();
			try (Session session = driver.session(SessionConfig.forDatabase("neo4j"))) {
				String cypherQuery = "MATCH (m:Movie) RETURN m.title as title, m.released as released, m.tagline as tagline LIMIT 200";
		
				var result = session.readTransaction(tx -> tx.run(cypherQuery).list());
		
				for (Record record : result) {
					var title = record.get("title").toString();
					int released = Integer.parseInt(record.get("released").toString());
					String tagline = record.get("tagline").toString();
					var Movie = new Movie(title, released, tagline);
					movies.add(Movie);
				}
			}
			//driver.close();
			movieRepository.saveAll(movies);
		};
	}
}